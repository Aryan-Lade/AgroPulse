import { motion } from 'framer-motion'
import { classNames } from '../../utils/formatters.js'

const variants = {
  primary:
    'bg-primary-600 hover:bg-primary-500 text-white shadow-lg shadow-primary-600/25',
  secondary:
    'glass hover:bg-white/10 text-night-100',
  ghost:
    'text-night-200 hover:text-primary-300 hover:bg-white/5',
  danger:
    'bg-accent-rose/90 hover:bg-accent-rose text-white shadow-lg shadow-accent-rose/25',
}

const sizes = {
  sm: 'px-3.5 py-2 text-sm rounded-lg',
  md: 'px-5 py-2.5 text-sm rounded-xl',
  lg: 'px-7 py-3.5 text-base rounded-xl',
}

function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  className,
  ...props
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={classNames(
        'inline-flex items-center justify-center gap-2 font-semibold transition-colors cursor-pointer disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {Icon && <Icon className="text-lg" />}
      {children}
    </motion.button>
  )
}

export default Button
