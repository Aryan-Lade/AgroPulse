import { useTheme } from '../../context/ThemeContext.jsx'
import { getChartTheme } from '../../utils/chartTheme.js'

/**
 * useChartTheme — resolves the validated chart palette + shared
 * axis/tooltip props for the active theme. Every chart consumes this
 * so all six charts restyle together when the theme flips.
 */
export function useChartTheme() {
  const { theme } = useTheme()
  const palette = getChartTheme(theme)

  return {
    palette,
    axisProps: {
      stroke: palette.axis,
      tick: { fill: palette.tickFill, fontSize: 11 },
      tickLine: false,
      axisLine: false,
    },
    // Solid hairline grid, horizontal only — recessive, never dashed
    gridProps: {
      stroke: palette.grid,
      vertical: false,
    },
    tooltipProps: {
      contentStyle: {
        backgroundColor: palette.tooltipBg,
        border: `1px solid ${palette.tooltipBorder}`,
        borderRadius: 12,
        color: palette.tooltipText,
        fontSize: 12,
        boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
      },
      itemStyle: { color: palette.tooltipText },
      labelStyle: { color: palette.tooltipText, fontWeight: 600 },
      cursor: { fill: palette.cursorFill },
    },
    legendProps: {
      wrapperStyle: { fontSize: 12, color: palette.legendText },
      iconType: 'circle',
      iconSize: 8,
    },
  }
}
