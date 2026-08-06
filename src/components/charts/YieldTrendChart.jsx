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
import { yieldTrend } from '../../data/dashboardData.js'
import { useChartTheme } from '../../hooks/useChartTheme.js'

/**
 * YieldTrendChart — single-series area of forecast yield (t/ha).
 * Area wash at 10% opacity; the 2px line carries the value.
 */
function YieldTrendChart() {
  const { palette, axisProps, gridProps, tooltipProps } = useChartTheme()

  return (
    <ChartCard title="Yield Trend" subtitle="Season forecast, tonnes per hectare">
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={yieldTrend} margin={{ top: 8, right: 12, left: -16, bottom: 0 }}>
          <CartesianGrid {...gridProps} />
          <XAxis dataKey="month" {...axisProps} />
          <YAxis {...axisProps} domain={[0, 'auto']} tickFormatter={(v) => `${v}`} />
          <Tooltip {...tooltipProps} formatter={(value) => [`${value} t/ha`, 'Yield']} />
          <Area
            type="monotone"
            dataKey="yieldT"
            name="Yield"
            stroke={palette.series[0]}
            strokeWidth={2}
            fill={palette.series[0]}
            fillOpacity={0.1}
            dot={false}
            activeDot={{ r: 5, fill: palette.series[0], stroke: palette.surface, strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}

export default YieldTrendChart
