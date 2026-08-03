import { classNames } from '../../utils/formatters.js'

/* Status → theme-aware token classes (see --ap-badge-* in index.css) */
const styles = {
  healthy: 'bg-primary-500/15 text-badge-primary border-primary-500/30',
  optimal: 'bg-primary-500/15 text-badge-primary border-primary-500/30',
  good: 'bg-primary-500/15 text-badge-primary border-primary-500/30',
  active: 'bg-primary-500/15 text-badge-primary border-primary-500/30',
  warning: 'bg-accent-amber/15 text-badge-amber border-accent-amber/30',
  moderate: 'bg-accent-amber/15 text-badge-amber border-accent-amber/30',
  charging: 'bg-accent-sky/15 text-badge-sky border-accent-sky/30',
  info: 'bg-accent-sky/15 text-badge-sky border-accent-sky/30',
  critical: 'bg-accent-rose/15 text-badge-rose border-accent-rose/30',
  low: 'bg-accent-rose/15 text-badge-rose border-accent-rose/30',
  maintenance: 'bg-surface-2 text-ink-2 border-line-2',
  neutral: 'bg-surface-2 text-ink-2 border-line-2',
}

function Badge({ children, status = 'neutral', className }) {
  return (
    <span
      className={classNames(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border capitalize',
        styles[status] ?? styles.neutral,
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {children}
    </span>
  )
}

export default Badge
