import {
  HiOutlineCloud,
  HiOutlineMapPin,
  HiOutlineSun,
  HiOutlineArrowDown,
  HiOutlineArrowUp,
} from 'react-icons/hi2'
import { WiHumidity, WiStrongWind, WiRaindrops } from 'react-icons/wi'
import Card from '../common/Card.jsx'
import { currentWeather } from '../../data/dashboardData.js'

const metrics = [
  { id: 'humidity', label: 'Humidity', value: `${currentWeather.humidity}%`, icon: WiHumidity },
  { id: 'wind', label: 'Wind', value: `${currentWeather.windSpeed} km/h`, icon: WiStrongWind },
  { id: 'rain', label: 'Rain', value: `${currentWeather.rainProbability}%`, icon: WiRaindrops },
]
function WeatherCard() {
  return (
    <Card hover={false} className="flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-display font-semibold text-ink">Weather</h2>
          <p className="text-xs text-ink-3 mt-0.5 flex items-center gap-1">
            <HiOutlineMapPin className="text-sm" />
            {currentWeather.location}
          </p>
        </div>
        <span className="size-11 rounded-xl bg-accent-sky/15 flex items-center justify-center text-accent-sky text-2xl">
          <HiOutlineCloud />
        </span>
      </div>

      <div className="flex items-end gap-3 mb-1">
        <span className="font-display text-5xl font-bold text-ink">
          {currentWeather.temperature}°
        </span>
        <div className="pb-1.5">
          <p className="text-sm text-ink">{currentWeather.condition}</p>
          <p className="text-xs text-ink-3">Feels like {currentWeather.feelsLike}°C</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-4">
        {metrics.map((metric) => (
          <div key={metric.id} className="glass rounded-xl px-3 py-2.5 text-center">
            <metric.icon className="text-2xl text-accent-sky mx-auto" />
            <p className="text-sm font-semibold text-ink mt-0.5">{metric.value}</p>
            <p className="text-[11px] text-ink-3">{metric.label}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-4 text-xs text-ink-2">
        <span className="flex items-center gap-1.5">
          <HiOutlineArrowUp className="text-accent-amber" />
          Sunrise {currentWeather.sunrise}
        </span>
        <span className="flex items-center gap-1.5">
          <HiOutlineSun className="text-accent-amber" />
          UV {currentWeather.uvIndex}
        </span>
        <span className="flex items-center gap-1.5">
          <HiOutlineArrowDown className="text-accent-amber" />
          Sunset {currentWeather.sunset}
        </span>
      </div>
    </Card>
  )
}

export default WeatherCard
