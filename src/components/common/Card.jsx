import { motion } from 'framer-motion'
import { classNames } from '../../utils/formatters.js'
import { scaleIn, SPRING } from '../../utils/motionVariants.js'


function Card({
  children,
  className,
  hover = true,
  animate = true,
  float = false,
  ...props
}) {
  const Component = animate ? motion.div : 'div'

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
