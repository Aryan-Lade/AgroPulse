export const dashboardStats = {
  summary: [
    { id: 'crop-health', label: 'Crop Health', value: 94, unit: '%', trend: 2.4, status: 'healthy' },
    { id: 'soil-moisture', label: 'Soil Moisture', value: 61, unit: '%', trend: -1.2, status: 'optimal' },
    { id: 'active-drones', label: 'Active Drones', value: 8, unit: '', trend: 0, status: 'good' },
    { id: 'yield-forecast', label: 'Yield Forecast', value: 12.8, unit: 't/ha', trend: 5.1, status: 'good' },
  ],
  healthTimeline: [
    { month: 'Jan', health: 82, moisture: 55 },
    { month: 'Feb', health: 85, moisture: 58 },
    { month: 'Mar', health: 88, moisture: 62 },
    { month: 'Apr', health: 86, moisture: 60 },
    { month: 'May', health: 91, moisture: 64 },
    { month: 'Jun', health: 94, moisture: 61 },
  ],
  alerts: [
    { id: 1, severity: 'warning', title: 'Low nitrogen in Zone B', time: '2h ago' },
    { id: 2, severity: 'critical', title: 'Possible blight detected in Field 3', time: '5h ago' },
    { id: 3, severity: 'info', title: 'Drone AV-04 completed survey', time: '8h ago' },
  ],
  fields: [
    { id: 'field-1', name: 'North Field', crop: 'Wheat', area: 42, health: 96 },
    { id: 'field-2', name: 'East Valley', crop: 'Corn', area: 38, health: 91 },
    { id: 'field-3', name: 'South Ridge', crop: 'Soybean', area: 27, health: 78 },
    { id: 'field-4', name: 'West Plains', crop: 'Rice', area: 51, health: 93 },
  ],
}
