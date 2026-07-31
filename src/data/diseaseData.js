export const diseaseScans = {
  recentScans: [
    { id: 'scan-001', crop: 'Tomato', disease: 'Late Blight', confidence: 97.2, severity: 'critical', date: '2026-07-29', field: 'South Ridge' },
    { id: 'scan-002', crop: 'Wheat', disease: 'Leaf Rust', confidence: 88.5, severity: 'warning', date: '2026-07-28', field: 'North Field' },
    { id: 'scan-003', crop: 'Corn', disease: 'Healthy', confidence: 99.1, severity: 'healthy', date: '2026-07-28', field: 'East Valley' },
    { id: 'scan-004', crop: 'Rice', disease: 'Bacterial Blight', confidence: 91.8, severity: 'warning', date: '2026-07-27', field: 'West Plains' },
  ],
  distribution: [
    { name: 'Healthy', value: 68 },
    { name: 'Fungal', value: 17 },
    { name: 'Bacterial', value: 9 },
    { name: 'Viral', value: 6 },
  ],
  treatments: [
    { disease: 'Late Blight', action: 'Apply copper-based fungicide within 24h', urgency: 'high' },
    { disease: 'Leaf Rust', action: 'Schedule triazole spray for affected zones', urgency: 'medium' },
    { disease: 'Bacterial Blight', action: 'Reduce overhead irrigation, isolate zone', urgency: 'medium' },
  ],
}
