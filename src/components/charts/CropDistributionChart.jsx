import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from 'recharts'
import ChartCard from './ChartCard.jsx'
import { cropDistribution } from '../../data/dashboardData.js'
import { useChartTheme } from '../../hooks/useChartTheme.js'
import { formatNumber } from '../../utils/formatters.js'

function CropDistributionChart() {
  const { palette, tooltipProps } = useChartTheme()
  const total = cropDistribution.reduce((sum, item) => sum + item.value, 0)

  return (
    <ChartCard title="Crop Distribution" subtitle="Cultivated area by crop (ha)">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative shrink-0">
          <ResponsiveContainer width={190} height={190}>
            <PieChart>
              <Tooltip
                {...tooltipProps}
                formatter={(value, name) => [
                  `${value} ha · ${((value / total) * 100).toFixed(0)}%`,
                  name,
                ]}
              />
              <Pie
                data={cropDistribution}
                dataKey="value"
                nameKey="name"
                innerRadius={58}
                outerRadius={88}
                paddingAngle={2}
                stroke={palette.surface}
                strokeWidth={2}
              >
                {cropDistribution.map((entry, index) => (
                  <Cell key={entry.name} fill={palette.series[index % palette.series.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          {/* Center total */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="font-display text-2xl font-bold text-ink">{formatNumber(total)}</span>
            <span className="text-[11px] text-ink-3">hectares</span>
          </div>
        </div>

        {}
        <ul className="flex-1 w-full flex flex-col gap-2">
          {cropDistribution.map((entry, index) => (
            <li key={entry.name} className="flex items-center gap-2.5 text-sm">
              <span
                className="size-2.5 rounded-full shrink-0"
                style={{ backgroundColor: palette.series[index % palette.series.length] }}
              />
              <span className="flex-1 text-ink-2">{entry.name}</span>
              <span className="font-semibold text-ink">{entry.value} ha</span>
              <span className="text-xs text-ink-3 w-9 text-right">
                {((entry.value / total) * 100).toFixed(0)}%
              </span>
            </li>
          ))}
        </ul>
      </div>
    </ChartCard>
  )
}

export default CropDistributionChart
