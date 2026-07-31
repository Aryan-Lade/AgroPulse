import { motion } from 'framer-motion'
import { classNames } from '../../utils/formatters.js'
import { scaleIn } from '../../utils/motionVariants.js'

function Card({ children, className, hover = true, animate = true, ...props }) {
  const Component = animate ? motion.div : 'div'
  const motionProps = animate
    ? {
        variants: scaleIn,
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true, margin: '-40px' },
        ...(hover && { whileHover: { y: -4, transition: { duration: 0.2 } } }),
      }
    : {}

  return (
    <Component
      className={classNames('glass-card p-5 sm:p-6', className)}
      {...motionProps}
      {...props}
    >
      {children}
    </Component>
  )
}

export default Card
