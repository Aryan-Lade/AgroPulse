import { motion } from 'framer-motion'
import { pageTransition } from '../../utils/motionVariants.js'
import { useScrollToTop } from '../../hooks/useScrollToTop.js'

function PageWrapper({ children, className = '' }) {
  useScrollToTop()

  return (
    <motion.div
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      exit={pageTransition.exit}
      transition={pageTransition.transition}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default PageWrapper
