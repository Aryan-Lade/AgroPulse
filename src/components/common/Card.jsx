import { motion } from 'framer-motion'
import { classNames } from '../../utils/formatters.js'
import { scaleIn, SPRING } from '../../utils/motionVariants.js'

/**
 * Card — glass surface with scroll-reveal entrance.
 * `hover` adds the premium lift: spring-driven -5px translate plus a
 * brand glow halo (`card-glow`, opacity-only on a pseudo-element so
 * the shadow itself is never animated on the compositor-critical path).
 * `float` adds a slow idle bob for spotlight cards.
 */
function Card({
  children,
  className,
  hover = true,
  animate = true,
  float = false,
  ...props
}) {
  const Component = animate ? motion.div : 'div'
  // `float` runs an idle bob via `animate`, which supersedes the
  // scroll-reveal variants — the two would fight over `y` otherwise.
  const motionProps = animate
    ? float
      ? {
          initial: { opacity: 0, y: 12 },
          animate: {
            opacity: 1,
            y: [0, -6, 0],
            transition: {
              opacity: { duration: 0.5 },
              y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
            },
          },
          ...(hover && { whileHover: { y: -5, scale: 1.01 }, transition: SPRING }),
        }
      : {
          variants: scaleIn,
          initial: 'hidden',
          whileInView: 'visible',
          viewport: { once: true, margin: '-40px' },
          ...(hover && {
            whileHover: { y: -5, scale: 1.01 },
            transition: SPRING,
          }),
        }
    : {}

  return (
    <Component
      className={classNames(
        'glass-card p-5 sm:p-6',
        hover && 'card-glow',
        className,
      )}
      {...motionProps}
      {...props}
    >
      {children}
    </Component>
  )
}

export default Card
