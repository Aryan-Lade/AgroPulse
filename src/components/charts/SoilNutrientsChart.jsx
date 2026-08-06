import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import ChartCard from './ChartCard.jsx'
import { soilNutrients } from '../../data/dashboardData.js'
import { useChartTheme } from '../../hooks/useChartTheme.js'

/**
 * SoilNutrientsChart — measured level vs optimal, grouped bars.
 * Two series → legend present; thin bars (≤24px), 4px rounded data-end,
 * square at the baseline.
 */
function SoilNutrientsChart() {
  const { palette, axisProps, gridProps, tooltipProps, legendProps } = useChartTheme()

  return (
    <ChartCard title="Soil Nutrients" subtitle="Measured level vs optimal range (kg/ha)">
      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={soilNutrients}
          margin={{ top: 8, right: 12, left: -16, bottom: 0 }}
          barGap={2}
          barCategoryGap="28%"
        >
          <CartesianGrid {...gridProps} />
          <XAxis dataKey="nutrient" {...axisProps} />
          <YAxis {...axisProps} />
          <Tooltip
            {...tooltipProps}
            formatter={(value, name) => [`${value} kg/ha`, name]}
            labelFormatter={(label) =>
              soilNutrients.find((n) => n.nutrient === label)?.label ?? label
            }
          />
          <Legend {...legendProps} />
          <Bar
            dataKey="level"
            name="Measured"
            fill={palette.series[0]}
            maxBarSize={20}
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="optimal"
            name="Optimal"
            fill={palette.series[1]}
            maxBarSize={20}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}

export default SoilNutrientsChart
