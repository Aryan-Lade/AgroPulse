import { motion } from 'framer-motion'
import { fadeInUp } from '@/utils/motionVariants.js'
import { classNames } from '@/utils/formatters.js'
import Badge from './Badge.jsx'

/**
 * PageHeader — consistent top section for every module page.
 * Shows icon, badge, title, description, and an optional action slot.
 */
function PageHeader({ icon: Icon, accent = 'primary', badge, title, description, action, className }) {
  const accentMap = {
    primary: 'bg-primary-500/15 text-primary-300 border-primary-500/30',
    rose:    'bg-accent-rose/15 text-rose-300 border-accent-rose/30',
    sky:     'bg-accent-sky/15 text-sky-300 border-accent-sky/30',
    amber:   'bg-accent-amber/15 text-amber-300 border-accent-amber/30',
    violet:  'bg-violet-500/15 text-violet-300 border-violet-500/30',
    emerald: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  }

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className={classNames('flex flex-wrap items-start justify-between gap-4 mb-6', className)}
    >
      <div className="flex items-start gap-4">
        {Icon && (
          <span className={classNames(
            'hidden sm:flex size-12 rounded-xl items-center justify-center text-2xl shrink-0 border',
            accentMap[accent] ?? accentMap.primary,
          )}>
            <Icon />
          </span>
        )}
        <div>
          {badge && (
            <Badge status={badge.status ?? 'neutral'} className="mb-2">{badge.label}</Badge>
          )}
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink leading-tight">
            {title}
          </h1>
          {description && (
            <p className="text-sm text-ink-2 mt-1 max-w-2xl leading-relaxed">{description}</p>
          )}
        </div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </motion.div>
  )
}

export default PageHeader
