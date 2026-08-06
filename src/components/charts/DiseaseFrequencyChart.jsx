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
import { diseaseFrequency } from '../../data/dashboardData.js'
import { useChartTheme } from '../../hooks/useChartTheme.js'

/**
 * DiseaseFrequencyChart — single-series line of detections per month.
 * One series → slot 1 only, no legend (the title names it).
 */
function DiseaseFrequencyChart() {
  const { palette, axisProps, gridProps, tooltipProps } = useChartTheme()

  return (
    <ChartCard title="Disease Detections" subtitle="Confirmed detections per month">
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={diseaseFrequency} margin={{ top: 8, right: 12, left: -16, bottom: 0 }}>
          <CartesianGrid {...gridProps} />
          <XAxis dataKey="month" {...axisProps} />
          <YAxis {...axisProps} allowDecimals={false} />
          <Tooltip {...tooltipProps} formatter={(value) => [value, 'Detections']} />
          <Line
            type="monotone"
            dataKey="detections"
            name="Detections"
            stroke={palette.series[0]}
            strokeWidth={2}
            dot={{ r: 4, fill: palette.series[0], stroke: palette.surface, strokeWidth: 2 }}
            activeDot={{ r: 5, stroke: palette.surface, strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}

export default DiseaseFrequencyChart
