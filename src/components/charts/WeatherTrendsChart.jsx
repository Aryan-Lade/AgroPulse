import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'
import ChartCard from './ChartCard.jsx'
import { weatherTrends } from '../../data/dashboardData.js'
import { useChartTheme } from '../../hooks/useChartTheme.js'


const METRICS = [
  { key: 'temperature', label: 'Temperature', unit: '°C', slot: 2 },
  { key: 'humidity', label: 'Humidity', unit: '%', slot: 1 },
  { key: 'rainfall', label: 'Rainfall', unit: 'mm', slot: 3 },
]

function MetricPanel({ metric, isLast }) {
  const { palette, axisProps, gridProps, tooltipProps } = useChartTheme()
  const color = palette.series[metric.slot]

  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <span className="size-2 rounded-full" style={{ backgroundColor: color }} />
        <span className="text-xs font-medium text-ink-2">{metric.label}</span>
      </div>
      <ResponsiveContainer width="100%" height={isLast ? 96 : 76}>
        <LineChart
          data={weatherTrends}
          margin={{ top: 4, right: 12, left: -22, bottom: 0 }}
          syncId="weather-trends"
        >
          <CartesianGrid {...gridProps} />
          <XAxis dataKey="day" {...axisProps} hide={!isLast} />
          <YAxis {...axisProps} width={40} tickCount={3} />
          <Tooltip
            {...tooltipProps}
            formatter={(value) => [`${value} ${metric.unit}`, metric.label]}
          />
          <Line
            type="monotone"
            dataKey={metric.key}
            name={metric.label}
            stroke={color}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: color, stroke: palette.surface, strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

function WeatherTrendsChart() {
  return (
    <ChartCard title="Weather Trends" subtitle="Past 7 days — hover to compare across panels">
      <div className="flex flex-col gap-2">
        {METRICS.map((metric, index) => (
          <MetricPanel key={metric.key} metric={metric} isLast={index === METRICS.length - 1} />
        ))}
      </div>
    </ChartCard>
  )
}

export default WeatherTrendsChart
