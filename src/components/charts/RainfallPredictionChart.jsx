import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'
import ChartCard from './ChartCard.jsx'
import { rainfallPrediction } from '../../data/dashboardData.js'
import { useChartTheme } from '../../hooks/useChartTheme.js'

function RainfallPredictionChart() {
  const { palette, axisProps, gridProps, tooltipProps } = useChartTheme()
  const rain = palette.series[1]
  return (
    <ChartCard title="Rainfall Outlook" subtitle="Next 7 days, predicted rainfall (mm)">
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={rainfallPrediction} margin={{ top: 8, right: 12, left: -16, bottom: 0 }}>
          <CartesianGrid {...gridProps} />
          <XAxis dataKey="day" {...axisProps} />
          <YAxis {...axisProps} />
          <Tooltip
            {...tooltipProps}
            formatter={(value, name, item) => [
              `${value} mm · ${item?.payload?.probability ?? 0}% chance`,
              'Rainfall',
            ]}
          />
          <Area
            type="monotone"
            dataKey="rainfall"
            name="Rainfall"
            stroke={rain}
            strokeWidth={2}
            fill={rain}
            fillOpacity={0.1}
            dot={{ r: 4, fill: rain, stroke: palette.surface, strokeWidth: 2 }}
            activeDot={{ r: 5, stroke: palette.surface, strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}

export default RainfallPredictionChart
