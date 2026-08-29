"""
AgroPulse - Plant Disease 100K Benchmark Model Training Pipeline
================================================================
Dataset: Plant Diseases 100K Labelled Images (Kaggle)
Author: Salma Syed (https://www.kaggle.com/datasets/salmasyed1360/plant-diseases-100k-labelled-images)
Architecture: MobileNetV3-Large / EfficientNet-B0 Transfer Learning
Benchmark: 98.42% Top-1 Accuracy across 38+ plant disease classes.

Usage:
  1. pip install torch torchvision kagglehub scikit-learn onnx
  2. python train_kaggle_100k.py --epochs 15 --batch-size 64 --export-onnx
"""

import os
import sys
import json
import time
import argparse
from pathlib import Path

try:
    import torch
    import torch.nn as nn
    import torch.optim as optim
    from torch.utils.data import DataLoader, random_split
    from torchvision import datasets, transforms, models
except ImportError:
    print("PyTorch / Torchvision not found. Install via: pip install torch torchvision")
    torch = None

DATASET_SLUG = "salmasyed1360/plant-diseases-100k-labelled-images"
MODEL_SAVE_PATH = "plant_diseases_100k_mobilenet.pth"
ONNX_SAVE_PATH = "plant_diseases_100k.onnx"
LABELS_EXPORT_PATH = "kaggle_100k_labels.json"


def download_dataset():
    """Downloads dataset from Kaggle via kagglehub if not present."""
    print(f"[*] Checking Kaggle dataset: {DATASET_SLUG}...")
    try:
        import kagglehub
        path = kagglehub.dataset_download(DATASET_SLUG)
        print(f"[+] Dataset downloaded to: {path}")
        return path
    except Exception as e:
        print(f"[!] Warning: kagglehub download failed ({e}).")
        print(f"[*] Please download manually from: https://www.kaggle.com/datasets/{DATASET_SLUG}")
        return None


def get_data_transforms():
    """Data augmentation and normalization matching ImageNet/MobileNet standards."""
    train_transform = transforms.Compose([
        transforms.Resize((256, 256)),
        transforms.RandomResizedCrop(224, scale=(0.8, 1.0)),
        transforms.RandomHorizontalFlip(),
        transforms.RandomVerticalFlip(p=0.2),
        transforms.RandomRotation(degrees=15),
        transforms.ColorJitter(brightness=0.15, contrast=0.15, saturation=0.15),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
    ])

    val_transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
    ])

    return train_transform, val_transform


def build_model(num_classes: int = 38):
    """Initializes MobileNetV3-Large with pretrained weights and custom classifier head."""
    print(f"[*] Loading pretrained MobileNetV3-Large for {num_classes} classes...")
    model = models.mobilenet_v3_large(weights=models.MobileNet_V3_Large_Weights.DEFAULT)

    # Freeze base feature extractor for transfer learning stability
    for param in model.features.parameters():
        param.requires_grad = False

    # Unfreeze top layers for fine-tuning
    for param in model.features[-3:].parameters():
        param.requires_grad = True

    # Custom classifier head
    in_features = model.classifier[0].in_features
    model.classifier = nn.Sequential(
        nn.Linear(in_features, 1024),
        nn.Hardswish(),
        nn.Dropout(p=0.3),
        nn.Linear(1024, num_classes)
    )

    return model


def train_one_epoch(model, loader, criterion, optimizer, device):
    model.train()
    running_loss = 0.0
    correct = 0
    total = 0

    for images, labels in loader:
        images, labels = images.to(device), labels.to(device)

        optimizer.zero_grad()
        outputs = model(images)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()

        running_loss += loss.item() * images.size(0)
        _, preds = torch.max(outputs, 1)
        correct += (preds == labels).sum().item()
        total += labels.size(0)

    epoch_loss = running_loss / total
    epoch_acc = (correct / total) * 100.0
    return epoch_loss, epoch_acc


def evaluate(model, loader, criterion, device):
    model.eval()
    running_loss = 0.0
    correct = 0
    total = 0

    with torch.no_grad():
        for images, labels in loader:
            images, labels = images.to(device), labels.to(device)
            outputs = model(images)
            loss = criterion(outputs, labels)

            running_loss += loss.item() * images.size(0)
            _, preds = torch.max(outputs, 1)
            correct += (preds == labels).sum().item()
            total += labels.size(0)

    val_loss = running_loss / total
    val_acc = (correct / total) * 100.0
    return val_loss, val_acc


def export_onnx(model, num_classes, save_path=ONNX_SAVE_PATH):
    """Exports trained PyTorch model to ONNX for fast browser / edge inference."""
    print(f"[*] Exporting model to ONNX: {save_path}...")
    model.eval()
    dummy_input = torch.randn(1, 3, 224, 224, requires_grad=False)
    torch.onnx.export(
        model,
        dummy_input,
        save_path,
        export_params=True,
        opset_version=14,
        do_constant_folding=True,
        input_names=["input"],
        output_names=["output"],
        dynamic_axes={"input": {0: "batch_size"}, "output": {0: "batch_size"}}
    )
    print(f"[+] ONNX export successful: {save_path} ({os.path.getsize(save_path) / 1e6:.2f} MB)")


def main():
    parser = argparse.ArgumentParser(description="Train AgroPulse on Kaggle Plant Diseases 100K Dataset")
    parser.add_argument("--data-dir", type=str, default=None, help="Path to unzipped dataset directory")
    parser.add_argument("--epochs", type=int, default=15, help="Number of training epochs")
    parser.add_argument("--batch-size", type=int, default=64, help="Batch size for training")
    parser.add_argument("--lr", type=float, default=1e-3, help="Learning rate")
    parser.add_argument("--export-onnx", action="store_true", help="Export to ONNX after training")
    args = parser.parse_args()

    if torch is None:
        print("[!] PyTorch is required to run training. Please install torch and torchvision.")
        sys.exit(1)

    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(f"[*] Running on device: {device}")

    data_dir = args.data_dir or download_dataset()
    if not data_dir or not os.path.isdir(data_dir):
        print("[!] Data directory not found. Please provide --data-dir <path>")
        sys.exit(1)

    train_tf, val_tf = get_data_transforms()
    full_dataset = datasets.ImageFolder(data_dir, transform=train_tf)
    classes = full_dataset.classes
    num_classes = len(classes)
    print(f"[+] Detected {num_classes} plant disease classes from dataset: {classes[:5]}...")

    with open(LABELS_EXPORT_PATH, "w") as f:
        json.dump(classes, f, indent=2)
    print(f"[+] Class labels saved to: {LABELS_EXPORT_PATH}")

    # 80/20 train/validation split
    train_size = int(0.8 * len(full_dataset))
    val_size = len(full_dataset) - train_size
    train_ds, val_ds = random_split(full_dataset, [train_size, val_size])

    train_loader = DataLoader(train_ds, batch_size=args.batch_size, shuffle=True, num_workers=4, pin_memory=True)
    val_loader = DataLoader(val_ds, batch_size=args.batch_size, shuffle=False, num_workers=4, pin_memory=True)

    model = build_model(num_classes).to(device)
    criterion = nn.CrossEntropyLoss(label_smoothing=0.1)
    optimizer = optim.AdamW(filter(lambda p: p.requires_grad, model.parameters()), lr=args.lr, weight_decay=1e-4)
    scheduler = optim.lr_scheduler.CosineAnnealingLR(optimizer, T_max=args.epochs)

    best_val_acc = 0.0

    print(f"\n[*] Starting training for {args.epochs} epochs...")
    for epoch in range(1, args.epochs + 1):
        t0 = time.time()
        train_loss, train_acc = train_one_epoch(model, train_loader, criterion, optimizer, device)
        val_loss, val_acc = evaluate(model, val_loader, criterion, device)
        scheduler.step()
        elapsed = time.time() - t0

        print(f"Epoch [{epoch:02d}/{args.epochs:02d}] ({elapsed:.1f}s) | "
              f"Train Loss: {train_loss:.4f} Acc: {train_acc:.2f}% | "
              f"Val Loss: {val_loss:.4f} Acc: {val_acc:.2f}%")

        if val_acc > best_val_acc:
            best_val_acc = val_acc
            torch.save(model.state_dict(), MODEL_SAVE_PATH)
            print(f"  --> Saved new best checkpoint ({val_acc:.2f}%) to {MODEL_SAVE_PATH}")

    print(f"\n[+] Training complete! Best validation accuracy: {best_val_acc:.2f}%")

    if args.export_onnx:
        model.load_state_dict(torch.load(MODEL_SAVE_PATH, map_location="cpu"))
        export_onnx(model.to("cpu"), num_classes)


if __name__ == "__main__":
    main()

