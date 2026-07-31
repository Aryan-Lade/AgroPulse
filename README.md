<div align="center">

<!-- PROJECT LOGO -->
<img src="docs/assets/logo.png" alt="AgriNova AI Logo" width="140" height="140" />

# 🌾 AgriNova AI

### *Empowering Farmers with AI, Data, and Precision Agriculture*

An AI-powered Smart Agriculture Platform helping farmers make data-driven decisions using Artificial Intelligence, Computer Vision, Machine Learning, Weather Analytics, and Precision Agriculture.

<br/>

<!-- BADGES -->
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110+-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![TensorFlow](https://img.shields.io/badge/TensorFlow-2.x-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)](https://www.tensorflow.org/)
[![OpenCV](https://img.shields.io/badge/OpenCV-4.x-5C3EE8?style=for-the-badge&logo=opencv&logoColor=white)](https://opencv.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

[![GitHub Stars](https://img.shields.io/github/stars/your-username/agrinova-ai?style=for-the-badge&logo=github)](https://github.com/your-username/agrinova-ai/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/your-username/agrinova-ai?style=for-the-badge&logo=github)](https://github.com/your-username/agrinova-ai/network/members)
[![GitHub Issues](https://img.shields.io/github/issues/your-username/agrinova-ai?style=for-the-badge&logo=github)](https://github.com/your-username/agrinova-ai/issues)
[![Deployment](https://img.shields.io/badge/Deployment-Coming%20Soon-blueviolet?style=for-the-badge)](https://your-deployment-url.com)

<br/>

[🚀 Live Demo](https://your-deployment-url.com) · [📖 Documentation](docs/) · [🐛 Report Bug](https://github.com/your-username/agrinova-ai/issues) · [✨ Request Feature](https://github.com/your-username/agrinova-ai/issues)

</div>

<br/>

<!-- BANNER IMAGE -->
![AgriNova AI Banner](docs/assets/banner.png)

---

## 📑 Table of Contents

- [🌱 About the Project](#-about-the-project)
- [✨ Features](#-features)
- [🛠️ Technology Stack](#️-technology-stack)
- [🏗️ System Architecture](#️-system-architecture)
- [📁 Folder Structure](#-folder-structure)
- [📸 Screenshots](#-screenshots)
- [⚙️ Installation](#️-installation)
- [🔐 Environment Variables](#-environment-variables)
- [📘 Usage Guide](#-usage-guide)
- [🔌 API Endpoints](#-api-endpoints)
- [🧠 Machine Learning Models](#-machine-learning-models)
- [🗺️ Future Roadmap](#️-future-roadmap)
- [📅 Project Timeline](#-project-timeline)
- [⚡ Performance](#-performance)
- [🔒 Security](#-security)
- [🚀 Deployment](#-deployment)
- [🧪 Testing](#-testing)
- [🤝 Contributing](#-contributing)
- [🎨 Code Style](#-code-style)
- [📄 License](#-license)
- [👥 Authors](#-authors)
- [🙏 Acknowledgements](#-acknowledgements)
- [📬 Contact](#-contact)
- [💖 Support](#-support)

---

## 🌱 About the Project

### 🧩 Problem Statement

Agriculture feeds the world, yet the people who grow our food often make critical decisions — what to plant, when to irrigate, how to treat disease — based on guesswork, tradition, or delayed advice. Small and marginal farmers lack access to agronomists, lab-grade soil testing, and timely weather insights, resulting in:

- 🌾 **Crop losses of 20–40%** annually due to pests and diseases detected too late
- 💧 **Water and fertilizer wastage** from non-optimized, uniform application
- 🌦️ **Weather-related damage** from unforecasted rainfall, frost, and drought
- 📉 **Poor market timing**, forcing farmers to sell below fair value
- 🧾 **Missed government schemes** due to low awareness and complex processes

### 💡 Why AgriNova AI Exists

AgriNova AI bridges the gap between cutting-edge AI research and the farmer's field. It packages computer vision, machine learning, weather analytics, and satellite data into a single, farmer-friendly platform — accessible from a smartphone, in the farmer's own language.

### 🚜 Current Farming Challenges vs. How AI Solves Them

| Challenge | Traditional Approach | AgriNova AI Approach |
|---|---|---|
| Crop disease identification | Visual guesswork, delayed expert visits | 📷 Instant CNN-based detection from a leaf photo |
| Soil health assessment | Expensive, slow lab testing | 🧪 ML-driven soil classification & health scoring |
| Weather planning | Generic regional forecasts | 🌦️ Hyperlocal, farm-level weather intelligence |
| Fertilizer usage | Uniform blanket application | 🌿 Precision, crop- and soil-specific recommendations |
| Yield estimation | Historical intuition | 📈 Data-driven yield prediction models |
| Field monitoring | Manual scouting on foot | 🛰️ Drone & satellite imagery analysis |

### 🎯 Objectives

1. **Democratize precision agriculture** — make AI-grade insights accessible to every farmer
2. **Reduce crop loss** through early disease detection and forecasting
3. **Optimize inputs** (water, fertilizer, pesticide) to cut cost and environmental impact
4. **Increase yield and income** with predictive analytics and market intelligence
5. **Promote sustainable farming** aligned with the UN Sustainable Development Goals (SDG 2 — Zero Hunger)

> [!NOTE]
> AgriNova AI is designed **mobile-first and low-bandwidth-friendly**, since most target users access the platform from rural areas with limited connectivity.

---

## ✨ Features

### 🤖 AI & Intelligence

| Feature | Description | Status |
|---|---|---|
| 📷 **AI Crop Disease Detection** | Upload a leaf/crop image and get instant disease diagnosis with treatment advice | ✅ Core |
| 🌦️ **Weather Intelligence** | Hyperlocal forecasts, rainfall alerts, frost warnings, and spray-window suggestions | ✅ Core |
| 🧪 **Soil Analysis** | Soil type classification, NPK profiling, pH interpretation, and health scoring | ✅ Core |
| 📈 **Yield Prediction** | ML-based yield forecasting using soil, weather, and historical crop data | ✅ Core |
| 🌿 **Fertilizer Recommendation** | Precise fertilizer type, dosage, and schedule per crop and soil condition | ✅ Core |
| 🚁 **Drone Image Analysis** | Aerial imagery processing for crop health mapping, stress zones, and pest hotspots | 🔨 In Progress |
| 🛰️ **Satellite Monitoring** | NDVI-based vegetation health tracking from satellite data | 🔜 Planned |

### 📊 Analytics & Insights

| Feature | Description | Status |
|---|---|---|
| 📊 **Farm Analytics Dashboard** | Real-time farm KPIs — crop health, input usage, alerts, and trends | ✅ Core |
| 💹 **Market Price Insights** | Live and historical mandi/market prices to time sales optimally | 🔨 In Progress |
| 🏛️ **Government Scheme Suggestions** | Personalized matching of subsidies, insurance, and welfare schemes | 🔨 In Progress |
| 📄 **PDF Report Generation** | Downloadable farm health, soil, and advisory reports | ✅ Core |

### 🌍 Accessibility & Community

| Feature | Description | Status |
|---|---|---|
| 🌐 **Multilingual Support** | Full platform experience in multiple regional languages | 🔨 In Progress |
| 🎙️ **Voice Assistant** | Voice-first interaction for low-literacy accessibility | 🔜 Planned |
| 📴 **Offline Support** | Core features cached and available without internet | 🔜 Planned |
| 💬 **Community Forum** | Farmer-to-farmer knowledge sharing and expert Q&A | 🔨 In Progress |
| 🔔 **Notifications** | Push/SMS alerts for weather, disease outbreaks, and price movements | ✅ Core |
| 🧑‍🌾 **Role-Based Dashboard** | Tailored views for Farmers, Agronomists, and Administrators | ✅ Core |

> [!TIP]
> Start with **Disease Detection** and the **Analytics Dashboard** — they deliver value from day one with just a smartphone camera.

---

## 🛠️ Technology Stack

<details open>
<summary><b>🎨 Frontend</b></summary>

| Technology | Purpose |
|---|---|
| ⚛️ React 18 | Component-based UI |
| ⚡ Vite | Build tooling & dev server |
| 🎨 TailwindCSS | Utility-first styling |
| 📊 Recharts / D3 | Data visualization |
| 🔄 React Query | Server-state management |
| 🧭 React Router | Client-side routing |

</details>

<details open>
<summary><b>🖥️ Backend</b></summary>

| Technology | Purpose |
|---|---|
| 🚀 FastAPI | High-performance async REST API |
| 🐍 Python 3.11+ | Core backend language |
| 🦄 Uvicorn | ASGI server |
| 🧰 Pydantic | Data validation & settings |
| 🗃️ SQLAlchemy | ORM & database access |
| 🌿 Celery + Redis | Background jobs (reports, alerts) |

</details>

<details open>
<summary><b>🧠 Machine Learning</b></summary>

| Technology | Purpose |
|---|---|
| 🔶 TensorFlow / Keras | Deep learning models (CNNs) |
| 📚 Scikit-Learn | Classical ML (regression, classification) |
| 🐼 Pandas / NumPy | Data processing & feature engineering |
| 🧪 XGBoost | Gradient-boosted yield & soil models |

</details>

<details open>
<summary><b>👁️ Computer Vision</b></summary>

| Technology | Purpose |
|---|---|
| 📷 OpenCV | Image preprocessing & augmentation |
| 🖼️ Pillow | Image I/O and manipulation |
| 🎯 YOLO (Ultralytics) | Object detection in drone imagery |

</details>

<details>
<summary><b>🗄️ Database</b></summary>

| Technology | Purpose |
|---|---|
| 🐘 PostgreSQL 16 | Primary relational database |
| 🌍 PostGIS | Geospatial farm & field data |
| ⚡ Redis | Caching & task queue broker |

</details>

<details>
<summary><b>☁️ Cloud</b></summary>

| Technology | Purpose |
|---|---|
| ☁️ AWS S3 / Cloud Storage | Image & report storage |
| 🌦️ OpenWeather API | Weather data |
| 🛰️ NASA / Sentinel APIs | Satellite imagery |

</details>

<details>
<summary><b>🔐 Authentication</b></summary>

| Technology | Purpose |
|---|---|
| 🔑 JWT (JSON Web Tokens) | Stateless auth |
| 🔒 OAuth 2.0 | Social login |
| 🛡️ bcrypt | Password hashing |

</details>

<details>
<summary><b>🚀 Deployment</b></summary>

| Technology | Purpose |
|---|---|
| 🐳 Docker & Docker Compose | Containerization |
| 🔄 GitHub Actions | CI/CD pipelines |
| 🌐 Nginx | Reverse proxy & static serving |

</details>

<details>
<summary><b>🧰 Developer Tools</b></summary>

| Technology | Purpose |
|---|---|
| 🧹 ESLint + Prettier | JS/TS linting & formatting |
| 🖤 Black + Ruff | Python formatting & linting |
| 🧪 Pytest / Vitest | Testing frameworks |
| 📓 Jupyter Notebooks | ML experimentation |

</details>

---

## 🏗️ System Architecture

<!-- ARCHITECTURE DIAGRAM -->
![System Architecture](docs/assets/architecture.png)

```mermaid
flowchart LR
    subgraph Client["🎨 Frontend"]
        UI[React + TailwindCSS SPA]
    end

    subgraph Server["🖥️ Backend"]
        API[FastAPI REST API]
        WORKER[Celery Workers]
    end

    subgraph ML["🧠 ML Services"]
        CV[Disease Detection CNN]
        YIELD[Yield Prediction]
        SOIL[Soil Classifier]
        DRONE[Drone Image Analyzer]
    end

    subgraph Data["🗄️ Data Layer"]
        PG[(PostgreSQL + PostGIS)]
        REDIS[(Redis Cache)]
        S3[(☁️ Cloud Storage)]
    end

    subgraph External["🌐 External APIs"]
        OW[OpenWeather API]
        NASA[NASA / Sentinel Satellite]
        MARKET[Market Price APIs]
    end

    UI -->|HTTPS / JSON| API
    API --> ML
    API --> PG
    API --> REDIS
    API --> WORKER
    WORKER --> S3
    API --> OW
    API --> NASA
    API --> MARKET
    ML --> S3
```

**Flow:** The React frontend communicates with the FastAPI backend over HTTPS. The backend orchestrates ML model inference, persists data in PostgreSQL/PostGIS, caches hot data in Redis, offloads heavy jobs (report generation, batch analysis) to Celery workers, stores media in cloud storage, and enriches insights via external weather, satellite, and market APIs.

---

## 📁 Folder Structure

```
agrinova-ai/
├── 📁 frontend/                  # React + Vite + TailwindCSS
│   ├── 📁 public/                # Static assets
│   ├── 📁 src/
│   │   ├── 📁 assets/            # Images, fonts, icons
│   │   ├── 📁 components/        # Reusable UI components
│   │   ├── 📁 features/          # Feature modules (disease, weather, soil…)
│   │   ├── 📁 hooks/             # Custom React hooks
│   │   ├── 📁 layouts/           # Page layouts & shells
│   │   ├── 📁 pages/             # Route-level pages
│   │   ├── 📁 services/          # API client & data fetching
│   │   ├── 📁 store/             # Global state
│   │   ├── 📁 utils/             # Helpers & formatters
│   │   ├── 📄 App.jsx
│   │   └── 📄 main.jsx
│   ├── 📄 package.json
│   └── 📄 tailwind.config.js
│
├── 📁 backend/                   # FastAPI application
│   ├── 📁 app/
│   │   ├── 📁 api/               # Route handlers (v1 endpoints)
│   │   ├── 📁 core/              # Config, security, settings
│   │   ├── 📁 models/            # SQLAlchemy models
│   │   ├── 📁 schemas/           # Pydantic schemas
│   │   ├── 📁 services/          # Business logic
│   │   ├── 📁 workers/           # Celery tasks
│   │   └── 📄 main.py            # App entrypoint
│   ├── 📁 alembic/               # DB migrations
│   ├── 📁 tests/                 # Backend test suite
│   └── 📄 requirements.txt
│
├── 📁 ml/                        # Machine Learning services
│   ├── 📁 models/                # Trained model artifacts (.h5, .pkl, .onnx)
│   ├── 📁 notebooks/             # Jupyter experiments
│   ├── 📁 training/              # Training pipelines & scripts
│   ├── 📁 inference/             # Inference API (model server)
│   ├── 📁 datasets/              # Dataset loaders & preprocessing
│   └── 📄 requirements.txt
│
├── 📁 docs/                      # Documentation & assets
│   ├── 📁 assets/                # Logo, banner, screenshots, diagrams
│   └── 📄 api.md                 # Extended API docs
│
├── 📁 docker/                    # Dockerfiles & compose configs
├── 📁 .github/                   # CI/CD workflows & issue templates
├── 📄 .env.example               # Environment variable template
├── 📄 docker-compose.yml
├── 📄 LICENSE
└── 📄 README.md
```

---

## 📸 Screenshots

> [!NOTE]
> Screenshots are placeholders — replace with real captures as modules ship.

| Module | Preview |
|---|---|
| 🏠 **Landing Page** | ![Landing Page](docs/assets/screenshots/landing.png) |
| 📊 **Dashboard** | ![Dashboard](docs/assets/screenshots/dashboard.png) |
| 📷 **Disease Detection** | ![Disease Detection](docs/assets/screenshots/disease-detection.png) |
| 🌦️ **Weather Module** | ![Weather Module](docs/assets/screenshots/weather.png) |
| 🧪 **Soil Analysis** | ![Soil Analysis](docs/assets/screenshots/soil-analysis.png) |
| 📈 **Yield Prediction** | ![Yield Prediction](docs/assets/screenshots/yield-prediction.png) |
| 🚁 **Drone Analysis** | ![Drone Analysis](docs/assets/screenshots/drone-analysis.png) |
| 📄 **Reports** | ![Reports](docs/assets/screenshots/reports.png) |
| ⚙️ **Settings** | ![Settings](docs/assets/screenshots/settings.png) |

---

## ⚙️ Installation

> [!IMPORTANT]
> **Prerequisites:** Node.js ≥ 18, Python ≥ 3.11, PostgreSQL ≥ 16, Redis ≥ 7, and Git. Docker is optional but recommended.

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/agrinova-ai.git
cd agrinova-ai
```

### 2️⃣ Install Frontend

```bash
cd frontend
npm install
```

### 3️⃣ Install Backend

```bash
cd ../backend
python -m venv venv

# Windows
venv\Scripts\activate
# macOS / Linux
source venv/bin/activate

pip install -r requirements.txt
```

### 4️⃣ Install ML Dependencies

```bash
cd ../ml
pip install -r requirements.txt
```

### 5️⃣ Configure Environment Variables

```bash
# From the project root
cp .env.example .env
# Edit .env with your database credentials and API keys
```

See [🔐 Environment Variables](#-environment-variables) for the full reference.

### 6️⃣ Run Database Migrations

```bash
cd backend
alembic upgrade head
```

### 7️⃣ Run the Frontend

```bash
cd frontend
npm run dev
# ➜ http://localhost:5173
```

### 8️⃣ Run the Backend

```bash
cd backend
uvicorn app.main:app --reload --port 8000
# ➜ http://localhost:8000  |  Docs: http://localhost:8000/docs
```

### 9️⃣ Run the ML Server

```bash
cd ml/inference
uvicorn server:app --reload --port 8500
# ➜ http://localhost:8500
```

<details>
<summary>🐳 <b>Or run everything with Docker Compose</b></summary>

```bash
docker compose up --build
```

This starts the frontend, backend, ML server, PostgreSQL, and Redis in one command.

</details>

---

## 🔐 Environment Variables

Create a `.env` file in the project root based on `.env.example`:

```env
# ─── Application ──────────────────────────────
APP_ENV=development
APP_SECRET_KEY=your-secret-key-here
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:8000

# ─── Database ─────────────────────────────────
DATABASE_URL=postgresql://username:password@localhost:5432/agrinova
REDIS_URL=redis://localhost:6379/0

# ─── Authentication ───────────────────────────
JWT_SECRET_KEY=your-jwt-secret-here
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7

# ─── External APIs ────────────────────────────
OPENWEATHER_API_KEY=your-openweather-api-key
NASA_API_KEY=your-nasa-api-key
MARKET_PRICE_API_KEY=your-market-api-key

# ─── ML Services ──────────────────────────────
ML_SERVER_URL=http://localhost:8500
MODEL_DIR=./ml/models

# ─── Cloud Storage ────────────────────────────
STORAGE_BUCKET=your-bucket-name
STORAGE_ACCESS_KEY=your-access-key
STORAGE_SECRET_KEY=your-secret-key
STORAGE_REGION=your-region

# ─── Notifications ────────────────────────────
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASSWORD=your-smtp-password
```

> [!WARNING]
> Never commit your real `.env` file. It is git-ignored by default — keep secrets out of version control and rotate any key that leaks.

---

## 📘 Usage Guide

### 🧑‍🌾 Step 1 — Create an Account
Register as a **Farmer**, **Agronomist**, or **Admin**. Each role unlocks a tailored dashboard.

### 🗺️ Step 2 — Register Your Farm
Add farm details — location (map pin or GPS), area, soil type, and current crops. This powers all personalized insights.

### 📷 Step 3 — Detect Crop Disease
1. Open **Disease Detection**
2. Photograph the affected leaf/plant (or upload from gallery)
3. Receive: disease name, confidence score, severity, and treatment recommendations

```
Example result:
🦠 Disease: Tomato Late Blight
🎯 Confidence: 96.4%
💊 Treatment: Apply copper-based fungicide; remove infected foliage; avoid overhead irrigation.
```

### 🌦️ Step 4 — Check Weather Intelligence
View 7-day hyperlocal forecasts, rainfall probability, and recommended spray/irrigation windows for your exact farm location.

### 🧪 Step 5 — Analyze Your Soil
Enter soil test values (or upload a soil report). Get soil classification, NPK status, pH interpretation, and crop suitability.

### 📈 Step 6 — Predict Yield & Get Fertilizer Advice
Select your crop and season — the platform forecasts expected yield and generates a precise fertilizer schedule.

### 🚁 Step 7 — Upload Drone Imagery *(optional)*
Upload aerial images to generate crop-health heatmaps and detect stress zones early.

### 📄 Step 8 — Export Reports
Generate PDF reports of any analysis to share with agronomists, banks, or insurers.

> [!TIP]
> Enable **notifications** in Settings to get proactive alerts for weather risks, disease outbreaks in your region, and market price spikes.

---

## 🔌 API Endpoints

Base URL: `http://localhost:8000/api/v1` — interactive docs at `/docs` (Swagger) and `/redoc`.

| Method | Endpoint | Description | Status |
|---|---|---|---|
| `POST` | `/auth/register` | Register a new user | ✅ Stable |
| `POST` | `/auth/login` | Authenticate & receive JWT | ✅ Stable |
| `POST` | `/auth/refresh` | Refresh access token | ✅ Stable |
| `GET` | `/users/me` | Get current user profile | ✅ Stable |
| `POST` | `/farms` | Register a new farm | ✅ Stable |
| `GET` | `/farms/{farm_id}` | Get farm details & analytics | ✅ Stable |
| `POST` | `/disease/detect` | Upload image → disease diagnosis | ✅ Stable |
| `GET` | `/weather/forecast` | Hyperlocal weather forecast | ✅ Stable |
| `POST` | `/soil/analyze` | Soil analysis & health score | ✅ Stable |
| `POST` | `/yield/predict` | Crop yield prediction | ✅ Stable |
| `POST` | `/fertilizer/recommend` | Fertilizer recommendation | ✅ Stable |
| `POST` | `/drone/analyze` | Drone imagery analysis | 🔨 Beta |
| `GET` | `/satellite/ndvi` | NDVI vegetation index | 🔜 Planned |
| `GET` | `/market/prices` | Market price insights | 🔨 Beta |
| `GET` | `/schemes/suggest` | Government scheme matching | 🔨 Beta |
| `POST` | `/reports/generate` | Generate PDF report | ✅ Stable |
| `GET` | `/notifications` | List user notifications | ✅ Stable |
| `GET` | `/forum/posts` | Community forum posts | 🔨 Beta |

---

## 🧠 Machine Learning Models

<details open>
<summary><b>📷 1. Crop Disease Detection</b></summary>

- **Architecture:** Convolutional Neural Network (transfer learning on EfficientNet / ResNet50)
- **Input:** RGB leaf/crop images (224×224)
- **Output:** Disease class + confidence + severity estimate
- **Expected Dataset:** [PlantVillage](https://www.kaggle.com/datasets/emmarex/plantdisease) (54K+ labeled images, 38 classes), augmented with field-collected images

</details>

<details open>
<summary><b>📈 2. Yield Prediction</b></summary>

- **Architecture:** XGBoost / Random Forest regression ensemble
- **Input:** Soil parameters, historical weather, crop type, sowing date, area
- **Output:** Predicted yield (tonnes/hectare) with confidence interval
- **Expected Dataset:** FAO crop statistics, national agriculture yield datasets, district-level historical records

</details>

<details>
<summary><b>🌦️ 3. Weather Forecast Enhancement</b></summary>

- **Architecture:** LSTM time-series model layered on external API forecasts
- **Input:** Historical + live weather series (temperature, humidity, rainfall, wind)
- **Output:** Hyperlocal short-term forecast refinement & anomaly alerts
- **Expected Dataset:** OpenWeather historical archives, NASA POWER climate data

</details>

<details>
<summary><b>🧪 4. Soil Classification</b></summary>

- **Architecture:** Gradient Boosting classifier (+ CNN for soil image classification)
- **Input:** NPK values, pH, EC, moisture, texture (or a soil photo)
- **Output:** Soil type, fertility class, health score (0–100)
- **Expected Dataset:** Soil health card datasets, LUCAS topsoil survey, regional soil surveys

</details>

<details>
<summary><b>🌿 5. Fertilizer Recommendation</b></summary>

- **Architecture:** Rule-augmented ML classifier (Decision Tree / kNN hybrid)
- **Input:** Soil profile, crop type, growth stage, target yield
- **Output:** Fertilizer type, dosage (kg/ha), and application schedule
- **Expected Dataset:** Fertilizer recommendation datasets (Kaggle), agronomy department guidelines

</details>

<details>
<summary><b>🚁 6. Drone Image Detection</b></summary>

- **Architecture:** YOLOv8 object detection + NDVI-style vegetation index mapping
- **Input:** High-resolution aerial RGB / multispectral imagery
- **Output:** Crop-health heatmaps, stress zones, pest hotspots, plant counts
- **Expected Dataset:** Agriculture-Vision, DeepWeeds, custom-annotated drone captures

</details>

> [!NOTE]
> Trained model artifacts live in `ml/models/` and are versioned separately (Git LFS / model registry recommended). Training notebooks are in `ml/notebooks/`.

---

## 🗺️ Future Roadmap

- [ ] 📡 **IoT Integration** — soil moisture, temperature & humidity sensor ingestion
- [ ] 🛰️ **Satellite Monitoring** — automated NDVI tracking via Sentinel-2 imagery
- [ ] ⛓️ **Blockchain Traceability** — farm-to-fork supply chain transparency
- [ ] 📱 **Mobile App** — native Android/iOS apps (React Native)
- [ ] 🤖 **AI Chatbot** — conversational agronomy assistant
- [ ] 🎙️ **Voice Commands** — hands-free, local-language voice control
- [ ] 🛒 **Farmer Marketplace** — direct farmer-to-buyer produce marketplace
- [ ] 🔌 **Sensor Integration** — plug-and-play third-party sensor support
- [ ] 📴 **Offline AI** — on-device model inference (TensorFlow Lite)
- [ ] 🔮 **Disease Forecasting** — predictive outbreak modeling from weather + region data

---

## 📅 Project Timeline

| Phase | Milestone | Timeline | Status |
|---|---|---|---|
| 1️⃣ | Research, problem validation & architecture design | Month 1 | ✅ Complete |
| 2️⃣ | Core backend, auth & database schema | Month 2 | ✅ Complete |
| 3️⃣ | Disease detection model — training & integration | Month 3 | 🔨 In Progress |
| 4️⃣ | Weather intelligence & soil analysis modules | Month 4 | 🔨 In Progress |
| 5️⃣ | Yield prediction & fertilizer recommendation | Month 5 | 🔜 Upcoming |
| 6️⃣ | Drone analysis & analytics dashboard | Month 6 | 🔜 Upcoming |
| 7️⃣ | Multilingual support, forum & notifications | Month 7 | 🔜 Upcoming |
| 8️⃣ | Testing, hardening & production deployment | Month 8 | 🔜 Upcoming |

---

## ⚡ Performance

> [!NOTE]
> Figures below are **target benchmarks** — actuals will be published after evaluation on held-out test sets.

### 🎯 Model Accuracy Targets

| Model | Metric | Target |
|---|---|---|
| 📷 Disease Detection | Top-1 Accuracy | `~95%+` *(placeholder)* |
| 📈 Yield Prediction | R² Score | `~0.85+` *(placeholder)* |
| 🧪 Soil Classification | F1 Score | `~0.90+` *(placeholder)* |
| 🌿 Fertilizer Recommendation | Accuracy | `~92%+` *(placeholder)* |
| 🚁 Drone Detection | mAP@0.5 | `~0.80+` *(placeholder)* |

### ⏱️ Inference Speed Targets

| Operation | Target Latency |
|---|---|
| Disease detection (single image) | `< 500 ms` *(placeholder)* |
| Yield prediction | `< 200 ms` *(placeholder)* |
| Soil analysis | `< 200 ms` *(placeholder)* |
| Drone image batch (per image) | `< 2 s` *(placeholder)* |
| API p95 response time | `< 300 ms` *(placeholder)* |

---

## 🔒 Security

| Layer | Implementation |
|---|---|
| 🔑 **Authentication** | JWT-based stateless auth with short-lived access tokens + refresh token rotation |
| 🧑‍💼 **Role-Based Access Control** | Farmer / Agronomist / Admin roles enforced at the route and service layers |
| 🧰 **API Validation** | Strict Pydantic schema validation on every request; typed responses |
| 🔒 **Encryption** | HTTPS/TLS in transit; bcrypt-hashed passwords; encrypted secrets at rest |
| 🚦 **Rate Limiting** | Per-user and per-IP throttling on sensitive endpoints |
| 🛡️ **Hardening** | CORS allowlist, security headers, SQL-injection-safe ORM queries, file-upload validation |

> [!WARNING]
> Found a vulnerability? Please **do not open a public issue.** Email the maintainers at `security@your-domain.com` *(placeholder)* — we follow responsible disclosure.

---

## 🚀 Deployment

| Component | Platform | URL |
|---|---|---|
| 🎨 Frontend | Vercel / Netlify | `https://agrinova-ai.vercel.app` *(placeholder)* |
| 🖥️ Backend API | Render / Railway / AWS EC2 | `https://api.agrinova-ai.com` *(placeholder)* |
| 🗄️ Database | Managed PostgreSQL (Neon / RDS / Supabase) | — |
| 🧠 ML Server | GPU instance / Hugging Face Spaces | `https://ml.agrinova-ai.com` *(placeholder)* |
| ☁️ Cloud Storage | AWS S3 / Cloudinary | — |
| 🌐 CDN | Cloudflare | — |

<details>
<summary><b>🐳 Production deployment with Docker</b></summary>

```bash
# Build and start the full stack in production mode
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
```

CI/CD via **GitHub Actions**: pushes to `main` run tests → build images → deploy automatically.

</details>

---

## 🧪 Testing

| Suite | Tooling | Run Command |
|---|---|---|
| 🎨 **Frontend Testing** | Vitest + React Testing Library | `cd frontend && npm run test` |
| 🖥️ **Backend Testing** | Pytest + httpx | `cd backend && pytest -v` |
| 🔌 **API Testing** | Pytest (integration) + Postman collection | `cd backend && pytest tests/api -v` |
| 🧠 **Model Testing** | Pytest + held-out evaluation sets | `cd ml && pytest tests/ -v` |

```bash
# Run everything with coverage
cd backend && pytest --cov=app --cov-report=term-missing
cd frontend && npm run test -- --coverage
```

> [!TIP]
> All tests run automatically in CI on every pull request — a green pipeline is required before merge.

---

## 🤝 Contributing

Contributions make open source amazing — **all contributions are welcome!** 💚

### 🔀 Git Workflow

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/<your-username>/agrinova-ai.git`
3. **Create a branch** from `main` (see naming below)
4. **Commit** your changes (see commit format below)
5. **Push** and open a **Pull Request** against `main`

### 🌿 Branch Naming

```
feature/<short-description>      → feature/drone-heatmap
fix/<short-description>          → fix/weather-api-timeout
docs/<short-description>         → docs/update-api-reference
refactor/<short-description>     → refactor/soil-service
test/<short-description>         → test/yield-model-coverage
```

### 📝 Commit Message Format (Conventional Commits)

```
<type>(<scope>): <short summary>

feat(disease): add severity estimation to detection output
fix(auth): handle expired refresh tokens gracefully
docs(readme): add deployment instructions
test(soil): add classifier edge-case tests
chore(deps): bump fastapi to 0.111
```

### ✅ Pull Request Checklist

- [ ] Branch is up to date with `main`
- [ ] Code follows the project [Code Style](#-code-style)
- [ ] Tests added/updated and **all tests pass**
- [ ] Linting passes (`npm run lint` / `ruff check .`)
- [ ] Documentation updated where relevant
- [ ] PR description explains **what** and **why**
- [ ] Screenshots attached for UI changes

### 🐛 Issue Reporting Guidelines

When opening an issue, include:

1. **Clear title** — e.g., `[Bug] Disease detection fails on PNG uploads`
2. **Steps to reproduce** — numbered, minimal
3. **Expected vs. actual behavior**
4. **Environment** — OS, browser, Python/Node versions
5. **Logs/screenshots** where applicable

> [!NOTE]
> Look for issues tagged `good first issue` if you're new — they're scoped to be beginner-friendly.

---

## 🎨 Code Style

| Stack | Standard |
|---|---|
| ⚛️ **JavaScript / React** | ESLint (Airbnb-style config) + Prettier — 2-space indent, single quotes, semicolons |
| 🐍 **Python** | Black (88-char lines) + Ruff for linting + isort for imports |
| 🏷️ **Naming** | `camelCase` (JS variables/functions), `PascalCase` (components/classes), `snake_case` (Python), `SCREAMING_SNAKE_CASE` (constants) |
| 🧾 **Types** | Type hints required on all Python public functions; PropTypes/TypeScript for React components |
| 📚 **Docs** | Docstrings (Google style) for Python modules; JSDoc for shared JS utilities |

```bash
# Format & lint before committing
cd frontend && npm run lint && npm run format
cd backend  && black . && ruff check . --fix
```

---

## 📄 License

Distributed under the **MIT License** — free to use, modify, and distribute with attribution.

```
MIT License

Copyright (c) 2026 AgriNova AI Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

See [`LICENSE`](LICENSE) for the full text.

---

## 👥 Authors

| Avatar | Name | Role | Links |
|---|---|---|---|
| 🧑‍💻 | **Your Name** *(placeholder)* | Creator & Lead Developer | [GitHub](https://github.com/your-username) · [LinkedIn](https://linkedin.com/in/your-profile) |
| 🤝 | *Open for contributors!* | — | [Contribute →](#-contributing) |

<a href="https://github.com/your-username/agrinova-ai/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=your-username/agrinova-ai" alt="Contributors" />
</a>

---

## 🙏 Acknowledgements

- ⚛️ [React](https://react.dev/) — the UI library powering the frontend
- 🚀 [FastAPI](https://fastapi.tiangolo.com/) — blazing-fast Python API framework
- 🔶 [TensorFlow](https://www.tensorflow.org/) — deep learning framework for our CNN models
- 👁️ [OpenCV](https://opencv.org/) — computer vision preprocessing
- 📚 [Scikit-Learn](https://scikit-learn.org/) — classical ML toolkit
- 🎨 [TailwindCSS](https://tailwindcss.com/) — utility-first styling
- 🛰️ [NASA APIs](https://api.nasa.gov/) — satellite & climate data
- 🌦️ [OpenWeather APIs](https://openweathermap.org/api) — weather intelligence
- 🌍 The **Open Source Community** — for the shoulders we stand on
- 🧑‍🌾 The **farmers** whose feedback shapes this platform

---

## 📬 Contact

| Channel | Link |
|---|---|
| 🐙 GitHub | [github.com/your-username](https://github.com/your-username) *(placeholder)* |
| 💼 LinkedIn | [linkedin.com/in/your-profile](https://linkedin.com/in/your-profile) *(placeholder)* |
| 📧 Email | `your-email@example.com` *(placeholder)* |
| 🌐 Portfolio | [your-portfolio.com](https://your-portfolio.com) *(placeholder)* |

---

## 💖 Support

If AgriNova AI helps you or inspires you, please consider:

- ⭐ **Starring** the repository — it means a lot!
- 🍴 **Forking** and building on top of it
- 📢 **Sharing** it with your network
- 🐛 **Opening issues** with bugs or ideas
- ☕ **Buying us a coffee** → [buymeacoffee.com/your-username](https://buymeacoffee.com/your-username) *(placeholder)*

[![Star History](https://img.shields.io/badge/⭐-Star%20this%20repo-2ea44f?style=for-the-badge)](https://github.com/your-username/agrinova-ai)

---

<div align="center">

### 🌾 AgriNova AI

**Made with ❤️ for Sustainable Agriculture**

*Empowering every farmer with the intelligence of AI — one field at a time.*

<br/>

⬆️ [Back to Top](#-agrinova-ai)

<br/>

© 2026 AgriNova AI · Released under the [MIT License](LICENSE)

</div>
