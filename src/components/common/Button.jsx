import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { classNames } from '../../utils/formatters.js'
import { SPRING } from '../../utils/motionVariants.js'

const variants = {
  primary:
    'bg-primary-600 hover:bg-primary-500 text-white shadow-lg shadow-primary-600/25 hover:shadow-primary-500/40',
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

/** Inline spinner shown while `loading` — matches current text color. */
function ButtonSpinner() {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.6 }}
      className="flex"
    >
      <motion.span
        animate={{ rotate: 360 }}
        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
        className="size-4 rounded-full border-2 border-current border-t-transparent"
      />
    </motion.span>
  )
}

/**
 * Button — spring hover/press scale, pointer-origin ripple and a
 * built-in loading state (`loading` prop swaps the icon for a spinner
 * and locks interaction without a layout shift).
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  loading = false,
  className,
  onClick,
  disabled,
  ...props
}) {
  const [ripples, setRipples] = useState([])
  const nextId = useRef(0)

  const handleClick = (event) => {
    // Spawn a ripple at the pointer position (transform+opacity only).
    const rect = event.currentTarget.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height) * 2
    const ripple = {
      id: nextId.current++,
      x: event.clientX - rect.left - size / 2,
      y: event.clientY - rect.top - size / 2,
      size,
    }
    setRipples((prev) => [...prev, ripple])
    onClick?.(event)
  }

  const removeRipple = (id) => {
    setRipples((prev) => prev.filter((r) => r.id !== id))
  }

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      transition={SPRING}
      onClick={handleClick}
      disabled={disabled || loading}
      className={classNames(
        'relative overflow-hidden inline-flex items-center justify-center gap-2 font-semibold transition-[background-color,box-shadow] duration-300 cursor-pointer disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {/* Ripple layer */}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          initial={{ scale: 0, opacity: 0.35 }}
          animate={{ scale: 1, opacity: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          onAnimationComplete={() => removeRipple(ripple.id)}
          className="absolute rounded-full bg-white pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
          }}
        />
      ))}

      <AnimatePresence mode="wait" initial={false}>
        {loading ? (
          <ButtonSpinner key="spinner" />
        ) : (
          Icon && (
            <motion.span
              key="icon"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="flex"
            >
              <Icon className="text-lg" />
            </motion.span>
          )
        )}
      </AnimatePresence>
      <span className="relative">{children}</span>
    </motion.button>
  )
}

export default Button
