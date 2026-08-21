
export const chartPalettes = {
  dark: {
    series: ['#16a34a', '#0284c7', '#d97706', '#8b5cf6', '#e11d48'],
    surface: '#111c15',
    grid: 'rgba(255,255,255,0.07)',
    axis: '#779181',
    tickFill: '#9fb2a6',
    tooltipBg: 'rgba(11,18,14,0.92)',
    tooltipBorder: 'rgba(255,255,255,0.12)',
    tooltipText: '#e2e8e4',
    legendText: '#9fb2a6',
    cursorFill: 'rgba(255,255,255,0.05)',
  },
  light: {
    series: ['#16a34a', '#0284c7', '#d97706', '#7c3aed', '#e11d48'],
    surface: '#f6f9f4',
    grid: 'rgba(16,25,20,0.07)',
    axis: '#64756a',
    tickFill: '#46564c',
    tooltipBg: 'rgba(255,255,255,0.95)',
    tooltipBorder: 'rgba(16,25,20,0.1)',
    tooltipText: '#101914',
    legendText: '#46564c',
    cursorFill: 'rgba(16,25,20,0.04)',
  },
}

export function getChartTheme(theme) {
  return chartPalettes[theme] ?? chartPalettes.dark
}

export function axisProps(palette) {
  return {
    stroke: palette.axis,
    tick: { fill: palette.tickFill, fontSize: 11 },
    tickLine: false,
    axisLine: false,
  }
}

export function tooltipStyle(palette) {
  return {
    backgroundColor: palette.tooltipBg,
    border: `1px solid ${palette.tooltipBorder}`,
    borderRadius: 12,
    color: palette.tooltipText,
    fontSize: 12,
    boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
    backdropFilter: 'blur(8px)',
  }
}
