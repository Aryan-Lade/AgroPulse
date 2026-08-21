
import weatherData from '@/data/weather.json'

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

export const getWeather = (location) => {
  void location
  return Promise.resolve(weatherData)
}

export const getHourlyForecast = () => {
  return Promise.resolve(weatherData.hourly)
}

export const getWeeklyForecast = () => {
  return Promise.resolve(weatherData.forecast)
}

export const getAIInsights = () => {
  return Promise.resolve(AI_INSIGHTS)
}
