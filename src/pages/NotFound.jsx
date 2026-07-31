import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaSeedling } from 'react-icons/fa6'
import PageWrapper from '../components/common/PageWrapper.jsx'
import Button from '../components/common/Button.jsx'
import { ROUTES } from '../utils/constants.js'

function NotFound() {
  return (
    <PageWrapper>
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="size-20 rounded-2xl glass flex items-center justify-center text-4xl text-primary-400 mb-8"
        >
          <FaSeedling />
        </motion.div>
        <h1 className="font-display text-6xl sm:text-8xl font-extrabold text-gradient mb-4">
          404
        </h1>
        <p className="text-lg text-white font-semibold mb-2">
          This field hasn't been planted yet
        </p>
        <p className="text-sm text-night-300 mb-8 max-w-sm">
          The page you're looking for doesn't exist or has been moved to
          greener pastures.
        </p>
        <Link to={ROUTES.HOME}>
          <Button size="lg">Back to Home</Button>
        </Link>
      </div>
    </PageWrapper>
  )
}

export default NotFound
