export const dashboardStats = {
  summary: [
    { id: 'crop-health', label: 'Crop Health', value: 94, unit: '%', trend: 2.4, status: 'healthy' },
    { id: 'soil-moisture', label: 'Soil Moisture', value: 61, unit: '%', trend: -1.2, status: 'optimal' },
    { id: 'active-drones', label: 'Active Drones', value: 8, unit: '', trend: 0, status: 'good' },
    { id: 'yield-forecast', label: 'Yield Forecast', value: 12.8, unit: 't/ha', trend: 5.1, status: 'good' },
  ],
  fields: [
    { id: 'field-1', name: 'North Field', crop: 'Wheat', area: 42, health: 96 },
    { id: 'field-2', name: 'East Valley', crop: 'Corn', area: 38, health: 91 },
    { id: 'field-3', name: 'South Ridge', crop: 'Soybean', area: 27, health: 78 },
    { id: 'field-4', name: 'West Plains', crop: 'Rice', area: 51, health: 93 },
  ],
}

export const currentWeather = {
  location: 'Greenfield Farm, Punjab',
  condition: 'Partly Cloudy',
  temperature: 29,
  feelsLike: 32,
  humidity: 68,
  windSpeed: 14,
  rainProbability: 42,
  uvIndex: 6,
  sunrise: '05:52',
  sunset: '19:08',
}

export const farmHealth = {
  score: 87,
  label: 'Excellent',
  breakdown: [
    { id: 'crop', label: 'Crop Vitality', value: 92 },
    { id: 'soil', label: 'Soil Quality', value: 84 },
    { id: 'water', label: 'Water Balance', value: 81 },
    { id: 'pest', label: 'Pest Pressure', value: 89 },
  ],
}

export const cropStatus = [
  { id: 'wheat', crop: 'Wheat', field: 'North Field', status: 'healthy', note: 'Grain filling on schedule' },
  { id: 'corn', crop: 'Corn', field: 'East Valley', status: 'healthy', note: 'Tasseling stage — nominal' },
  { id: 'soybean', crop: 'Soybean', field: 'South Ridge', status: 'warning', note: 'Mild leaf discoloration' },
  { id: 'rice', crop: 'Rice', field: 'West Plains', status: 'critical', note: 'Blast lesions spreading' },
]

export const recentDetection = {
  crop: 'Rice',
  field: 'West Plains — Zone C',
  disease: 'Rice Blast (Magnaporthe oryzae)',
  confidence: 94.6,
  scannedAt: '2026-08-03T08:42:00',
  severity: 'critical',
  action: 'Apply tricyclazole 75 WP within 48h; isolate Zone C irrigation.',
}


export const todaysAlerts = [
  { id: 1, type: 'rain', severity: 'warning', title: 'Heavy Rain Expected', detail: '38 mm forecast between 16:00–20:00. Delay pesticide spraying.', time: '1h ago' },
  { id: 2, type: 'pest', severity: 'critical', title: 'Pest Warning — Armyworm', detail: 'Trap counts exceeded threshold in East Valley.', time: '3h ago' },
  { id: 3, type: 'soil', severity: 'warning', title: 'Low Soil Moisture', detail: 'Zone B moisture dropped to 31%. Irrigation recommended.', time: '5h ago' },
]

export const aiRecommendations = [
  { id: 1, title: 'Irrigate Zone B tonight', detail: 'Soil moisture 31% and falling; 25 mm before 06:00 restores optimum.', impact: 'high', category: 'Irrigation' },
  { id: 2, title: 'Treat rice blast in Zone C', detail: 'Fungicide window closes in 48h before spore release peaks.', impact: 'high', category: 'Disease' },
  { id: 3, title: 'Delay wheat harvest by 4 days', detail: 'Grain moisture at 16.2%; drying weather arrives Thursday.', impact: 'medium', category: 'Harvest' },
  { id: 4, title: 'Split nitrogen application', detail: 'Apply 40% now, 60% post-rain to cut leaching losses by ~18%.', impact: 'medium', category: 'Fertilizer' },
  { id: 5, title: 'Schedule drone NDVI pass', detail: 'Last survey 9 days old; canopy change detected on satellite.', impact: 'low', category: 'Monitoring' },
]

export const diseaseFrequency = [
  { month: 'Jan', detections: 4 },
  { month: 'Feb', detections: 6 },
  { month: 'Mar', detections: 9 },
  { month: 'Apr', detections: 7 },
  { month: 'May', detections: 12 },
  { month: 'Jun', detections: 16 },
  { month: 'Jul', detections: 11 },
  { month: 'Aug', detections: 8 },
]

export const yieldTrend = [
  { month: 'Jan', yieldT: 8.2 },
  { month: 'Feb', yieldT: 8.9 },
  { month: 'Mar', yieldT: 9.6 },
  { month: 'Apr', yieldT: 10.4 },
  { month: 'May', yieldT: 11.1 },
  { month: 'Jun', yieldT: 11.8 },
  { month: 'Jul', yieldT: 12.3 },
  { month: 'Aug', yieldT: 12.8 },
]

export const weatherTrends = [
  { day: 'Mon', temperature: 31, humidity: 62, rainfall: 2 },
  { day: 'Tue', temperature: 33, humidity: 58, rainfall: 0 },
  { day: 'Wed', temperature: 30, humidity: 66, rainfall: 8 },
  { day: 'Thu', temperature: 28, humidity: 74, rainfall: 22 },
  { day: 'Fri', temperature: 27, humidity: 78, rainfall: 31 },
  { day: 'Sat', temperature: 29, humidity: 70, rainfall: 12 },
  { day: 'Sun', temperature: 30, humidity: 64, rainfall: 4 },
]

export const soilNutrients = [
  { nutrient: 'N', label: 'Nitrogen', level: 42, optimal: 55 },
  { nutrient: 'P', label: 'Phosphorus', level: 38, optimal: 40 },
  { nutrient: 'K', label: 'Potassium', level: 61, optimal: 50 },
  { nutrient: 'Ca', label: 'Calcium', level: 47, optimal: 45 },
  { nutrient: 'Mg', label: 'Magnesium', level: 33, optimal: 35 },
  { nutrient: 'S', label: 'Sulphur', level: 28, optimal: 30 },
]

export const cropDistribution = [
  { name: 'Wheat', value: 42 },
  { name: 'Rice', value: 51 },
  { name: 'Corn', value: 38 },
  { name: 'Soybean', value: 27 },
  { name: 'Other', value: 14 },
]

export const rainfallPrediction = [
  { day: 'Mon', rainfall: 4, probability: 30 },
  { day: 'Tue', rainfall: 0, probability: 10 },
  { day: 'Wed', rainfall: 12, probability: 55 },
  { day: 'Thu', rainfall: 38, probability: 85 },
  { day: 'Fri', rainfall: 26, probability: 72 },
  { day: 'Sat', rainfall: 9, probability: 45 },
  { day: 'Sun', rainfall: 2, probability: 20 },
]

export const recentActivities = [
  { id: 1, type: 'scan', title: 'Disease scan completed', detail: 'Rice Blast detected in West Plains, Zone C — 94.6% confidence', time: '08:42 AM' },
  { id: 2, type: 'weather', title: 'Weather updated', detail: 'Heavy rain advisory issued for this evening', time: '07:30 AM' },
  { id: 3, type: 'yield', title: 'Yield prediction generated', detail: 'Season forecast revised to 12.8 t/ha (+5.1%)', time: 'Yesterday' },
  { id: 4, type: 'drone', title: 'Drone analysis finished', detail: 'AV-04 mapped 38 ha of East Valley — NDVI 0.78 avg', time: 'Yesterday' },
  { id: 5, type: 'soil', title: 'Soil samples processed', detail: '12 samples from Zone B analysed — nitrogen low', time: '2 days ago' },
]

export const quickActions = [
  { id: 'upload-leaf', label: 'Upload Leaf Image', description: 'AI disease scan', accent: 'primary' },
  { id: 'scan-soil', label: 'Scan Soil', description: 'Nutrient analysis', accent: 'amber' },
  { id: 'predict-yield', label: 'Predict Yield', description: 'Season forecast', accent: 'violet' },
  { id: 'view-weather', label: 'View Weather', description: '10-day outlook', accent: 'sky' },
  { id: 'drone-analysis', label: 'Open Drone Analysis', description: 'NDVI & mapping', accent: 'rose' },
  { id: 'pdf-report', label: 'Generate PDF Report', description: 'Export insights', accent: 'emerald' },
]

export const recentReports = [
  { id: 'RPT-2041', date: '2026-08-02', crop: 'Rice', prediction: 'Blast risk — high', status: 'critical', accuracy: 94.6 },
  { id: 'RPT-2040', date: '2026-08-01', crop: 'Wheat', prediction: 'Yield 5.2 t/ha', status: 'healthy', accuracy: 91.2 },
  { id: 'RPT-2039', date: '2026-07-30', crop: 'Corn', prediction: 'Armyworm pressure', status: 'warning', accuracy: 88.7 },
  { id: 'RPT-2038', date: '2026-07-28', crop: 'Soybean', prediction: 'Rust risk — low', status: 'healthy', accuracy: 92.4 },
  { id: 'RPT-2037', date: '2026-07-26', crop: 'Rice', prediction: 'Irrigation deficit', status: 'warning', accuracy: 90.1 },
]

export const notifications = [
  { id: 1, severity: 'critical', title: 'Rice blast detected', detail: 'Zone C requires fungicide within 48h', time: '8:42 AM', unread: true },
  { id: 2, severity: 'warning', title: 'Heavy rain this evening', detail: '38 mm expected between 16:00–20:00', time: '7:30 AM', unread: true },
  { id: 3, severity: 'info', title: 'Drone AV-04 survey complete', detail: 'East Valley NDVI map ready to view', time: 'Yesterday', unread: true },
  { id: 4, severity: 'warning', title: 'Soil moisture low in Zone B', detail: 'Dropped to 31% — irrigation advised', time: 'Yesterday', unread: false },
  { id: 5, severity: 'info', title: 'Weekly report ready', detail: 'Farm summary for Jul 27 – Aug 2', time: '2 days ago', unread: false },
]

export const messages = [
  { id: 1, from: 'Dr. Meera Sharma', role: 'Agronomist', preview: 'The blast treatment plan looks good — start with…', time: '9:12 AM', unread: true },
  { id: 2, from: 'Ravi Patel', role: 'Field Manager', preview: 'Zone B irrigation lines checked and ready.', time: '8:05 AM', unread: true },
  { id: 3, from: 'AgriNova Support', role: 'Support', preview: 'Your satellite subscription renews on Aug 15.', time: 'Yesterday', unread: false },
]

export const quickInsights = {
  ndvi: { value: 0.78, delta: 0.03, label: 'Avg NDVI' },
  irrigation: { nextWindow: 'Tonight 22:00', zones: ['Zone B'] },
  harvest: { crop: 'Wheat', daysLeft: 11 },
  market: [
    { crop: 'Wheat', price: 2340, unit: '₹/q', delta: 1.8 },
    { crop: 'Rice', price: 3120, unit: '₹/q', delta: -0.6 },
    { crop: 'Corn', price: 2010, unit: '₹/q', delta: 2.4 },
  ],
  tasks: [
    { id: 1, label: 'Approve fungicide order', done: false },
    { id: 2, label: 'Review drone flight plan', done: false },
    { id: 3, label: 'Sign soil lab report', done: true },
  ],
}

export const currentUser = {
  name: 'Arjun Mehta',
  role: 'Farm Owner',
  farm: 'Greenfield Farm',
  plan: 'Premium Plan',
  initials: 'AM',
}
