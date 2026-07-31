import { dashboardStats } from '../data/dashboardData.js'
import { diseaseScans } from '../data/diseaseData.js'
import { weatherData } from '../data/weatherData.js'
import { soilData } from '../data/soilData.js'
import { yieldData } from '../data/yieldData.js'
import { droneData } from '../data/droneData.js'

function simulateRequest(data, delay = 400) {
  return new Promise((resolve) => setTimeout(() => resolve(data), delay))
}

export const farmService = {
  getDashboardStats: () => simulateRequest(dashboardStats),
  getDiseaseScans: () => simulateRequest(diseaseScans),
  getWeather: () => simulateRequest(weatherData),
  getSoilAnalysis: () => simulateRequest(soilData),
  getYieldPrediction: () => simulateRequest(yieldData),
  getDroneFleet: () => simulateRequest(droneData),
}
