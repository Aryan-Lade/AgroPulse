import { motion } from 'framer-motion'
import { FaLeaf } from 'react-icons/fa6'

function Loader({ label = 'Loading' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
        className="size-12 rounded-full border-2 border-night-700 border-t-primary-500 flex items-center justify-center"
      >
        <FaLeaf className="text-primary-400 text-sm" />
      </motion.div>
      <p className="text-sm text-night-300">{label}…</p>
    </div>
  )
}

export default Loader
