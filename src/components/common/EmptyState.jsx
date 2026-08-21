import { motion } from 'framer-motion'
import { fadeInUp } from '@/utils/motionVariants.js'
import { classNames } from '@/utils/formatters.js'


function EmptyState({ icon: Icon, title, description, action, className }) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className={classNames(
        'flex flex-col items-center justify-center text-center gap-4 py-16 px-6',
        className,
      )}
    >
      {Icon && (
        <span className="size-16 rounded-2xl glass flex items-center justify-center text-3xl text-ink-3">
          <Icon />
        </span>
      )}
      <div>
        <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
        {description && (
          <p className="text-sm text-ink-2 mt-1 max-w-sm mx-auto leading-relaxed">{description}</p>
        )}
      </div>
      {action}
    </motion.div>
  )
}

export default EmptyState
