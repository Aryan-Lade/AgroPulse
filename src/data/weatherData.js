export const weatherData = {
  current: {
    location: 'Greenfield Farm, CA',
    temperature: 27,
    condition: 'Partly Cloudy',
    humidity: 58,
    windSpeed: 14,
    uvIndex: 6,
    precipitation: 10,
    feelsLike: 29,
  },
  forecast: [
    { day: 'Fri', high: 29, low: 18, condition: 'sunny', rain: 0 },
    { day: 'Sat', high: 31, low: 19, condition: 'sunny', rain: 0 },
    { day: 'Sun', high: 28, low: 17, condition: 'cloudy', rain: 20 },
    { day: 'Mon', high: 24, low: 16, condition: 'rainy', rain: 75 },
    { day: 'Tue', high: 23, low: 15, condition: 'rainy', rain: 60 },
    { day: 'Wed', high: 26, low: 16, condition: 'cloudy', rain: 15 },
    { day: 'Thu', high: 28, low: 18, condition: 'sunny', rain: 5 },
  ],
  hourly: [
    { time: '06:00', temp: 18, rain: 0 },
    { time: '09:00', temp: 22, rain: 0 },
    { time: '12:00', temp: 26, rain: 5 },
    { time: '15:00', temp: 27, rain: 10 },
    { time: '18:00', temp: 24, rain: 15 },
    { time: '21:00', temp: 20, rain: 5 },
  ],
  advisories: [
    { id: 1, type: 'irrigation', message: 'Rain expected Monday — delay irrigation for Zones A & B' },
    { id: 2, type: 'spraying', message: 'Ideal spraying window: Saturday 06:00–10:00, low wind' },
  ],
}
