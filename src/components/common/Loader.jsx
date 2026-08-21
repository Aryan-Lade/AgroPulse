import { motion } from 'framer-motion'
import { FaLeaf } from 'react-icons/fa6'


function Loader({ label = 'Loading' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-5 py-20">
      <div className="relative size-14">
        {/* Outer orbit ring */}
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full border-2 border-night-700 border-t-primary-500"
        />
        {}
        <motion.span
          animate={{ rotate: -360 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-2 rounded-full border-2 border-transparent border-b-primary-400/60"
        />
        {}
        <motion.span
          animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 flex items-center justify-center text-primary-400"
        >
          <FaLeaf className="text-sm" />
        </motion.span>
      </div>
      <p className="flex items-center gap-1 text-sm text-night-300">
        {label}
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            animate={{ opacity: [0.2, 1, 0.2], y: [0, -2, 0] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.15,
              ease: 'easeInOut',
            }}
          >
            .
          </motion.span>
        ))}
      </p>
    </div>
  )
}

export default Loader
