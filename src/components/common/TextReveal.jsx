import { motion } from 'framer-motion'
import { textRevealContainer, textRevealWord } from '../../utils/motionVariants.js'

function TextReveal({ text, as: Tag = 'span', className = '', delay = 0 }) {
  const words = text.split(' ')
  const MotionTag = motion.create(Tag)

  return (
    <MotionTag
      variants={textRevealContainer}
      initial="hidden"
      animate="visible"
      transition={{ delayChildren: delay }}
      className={className}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
          <motion.span variants={textRevealWord} className="inline-block will-change-transform">
            {word}
            {i < words.length - 1 && ' '}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  )
}

export default TextReveal
