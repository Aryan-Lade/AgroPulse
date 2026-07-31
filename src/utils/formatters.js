export function formatNumber(value, options = {}) {
  return new Intl.NumberFormat('en-US', options).format(value)
}

export function formatPercent(value, digits = 0) {
  return `${Number(value).toFixed(digits)}%`
}

export function formatDate(date, options = { month: 'short', day: 'numeric' }) {
  return new Intl.DateTimeFormat('en-US', options).format(new Date(date))
}

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function getStatusColor(status) {
  const map = {
    healthy: 'text-primary-400',
    good: 'text-primary-400',
    optimal: 'text-primary-400',
    warning: 'text-accent-amber',
    moderate: 'text-accent-amber',
    critical: 'text-accent-rose',
    low: 'text-accent-rose',
  }
  return map[status?.toLowerCase()] ?? 'text-night-300'
}
