import { motion } from 'framer-motion'
import { fadeInUp } from '../../utils/motionVariants.js'

function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  const alignment = align === 'center' ? 'text-center items-center' : 'text-left items-start'

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className={`flex flex-col gap-3 ${alignment}`}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-semibold uppercase tracking-widest text-primary-300">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-balance">
        {title}
      </h2>
      {description && (
        <p className="max-w-2xl text-night-300 text-sm sm:text-base leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  )
}

export default SectionHeading
