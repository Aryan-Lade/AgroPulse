/**
 * weatherService.js
 * Returns mock data from weather.json.
 * To connect to a real API: replace each Promise.resolve() with an api.get() call.
 *
 * Example swap-in:
 *   import api from './api'
 *   export const getWeather = (location) => api.get('/weather/current', { params: { location } })
 */
import weatherData from '@/data/weather.json'

// AI-generated agronomic insights based on current forecast.
// When a real AI endpoint is available, replace with: api.get('/weather/insights')
const AI_INSIGHTS = [
  {
    id: 'insight-001',
    type: 'irrigation',
    priority: 'high',
    title: 'Delay Irrigation — Rain Expected',
    message:
      'Heavy rain (95%) forecast for Tuesday. Skip scheduled irrigation on Mon–Tue to avoid waterlogging. Saves ~₹1,200 in pump costs.',
    icon: 'droplets',
    actionLabel: 'Adjust Schedule',
  },
  {
    id: 'insight-002',
    type: 'disease',
    priority: 'warning',
    title: 'High Late Blight Risk',
    message:
      'Humidity above 88% combined with temperatures of 25–27 °C creates ideal conditions for late blight in tomato and potato crops.',
    icon: 'alert-triangle',
    actionLabel: 'View Treatment',
  },
  {
    id: 'insight-003',
    type: 'harvest',
    priority: 'info',
    title: 'Optimal Harvest Window',
    message:
      'Friday–Saturday offer sunny, low-wind conditions (5–10 km/h). Ideal for harvesting wheat and soybean with minimal field losses.',
    icon: 'sun',
    actionLabel: 'Plan Harvest',
  },
  {
    id: 'insight-004',
    type: 'spray',
    priority: 'info',
    title: 'Spray Window: Thursday',
    message:
      'Thursday shows wind speed ≤16 km/h with no rain — the next suitable pesticide / fungicide spray window in the 7-day forecast.',
    icon: 'wind',
    actionLabel: 'Schedule Spray',
  },
]

/**
 * Fetch current weather for a given location.
 * @param {string} [location] — location string (ignored in mock; pass to real API)
 * @returns {Promise<object>} full weather.json payload
 */
export const getWeather = (location) => {
  // TODO: return api.get('/weather/current', { params: { location } })
  void location
  return Promise.resolve(weatherData)
}

/**
 * Fetch the hourly forecast array.
 * @returns {Promise<Array>}
 */
export const getHourlyForecast = () => {
  // TODO: return api.get('/weather/hourly')
  return Promise.resolve(weatherData.hourly)
}

/**
 * Fetch the 7-day forecast array.
 * @returns {Promise<Array>}
 */
export const getWeeklyForecast = () => {
  // TODO: return api.get('/weather/forecast/weekly')
  return Promise.resolve(weatherData.forecast)
}

/**
 * Fetch AI-generated agronomic insights.
 * @returns {Promise<Array>}
 */
export const getAIInsights = () => {
  // TODO: return api.get('/weather/insights')
  return Promise.resolve(AI_INSIGHTS)
}
