import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiArrowRight, HiOutlineSparkles } from 'react-icons/hi2'
import PageWrapper from '../components/common/PageWrapper.jsx'
import Button from '../components/common/Button.jsx'
import { APP_TAGLINE, ROUTES } from '../utils/constants.js'
import { fadeInUp, staggerContainer } from '../utils/motionVariants.js'

const highlights = [
  { value: '98.2%', label: 'Detection Accuracy' },
  { value: '40k+', label: 'Hectares Monitored' },
  { value: '12', label: 'Crop Models' },
  { value: '24/7', label: 'Drone Coverage' },
]

function Home() {
  return (
    <PageWrapper>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-24 left-1/4 size-72 rounded-full bg-primary-500/15 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 size-80 rounded-full bg-accent-sky/10 blur-3xl" />
        </div>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 lg:pt-32 pb-20 flex flex-col items-center text-center"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs sm:text-sm font-medium text-primary-300 mb-6"
          >
            <HiOutlineSparkles className="text-base" />
            AI-Powered Precision Agriculture
          </motion.span>
          <motion.h1
            variants={fadeInUp}
            className="font-display text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white text-balance leading-tight mb-6"
          >
            Grow Smarter with{' '}
            <span className="text-gradient">AgriVision AI</span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="max-w-2xl text-night-300 text-base sm:text-lg leading-relaxed mb-10"
          >
            {APP_TAGLINE}. Detect crop diseases in seconds, forecast yields with
            confidence, and command your drone fleet — all from one intelligent
            dashboard.
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Link to={ROUTES.DASHBOARD}>
              <Button size="lg" icon={HiArrowRight}>
                Open Dashboard
              </Button>
            </Link>
            <Link to={ROUTES.DISEASE}>
              <Button size="lg" variant="secondary">
                Try Disease Detection
              </Button>
            </Link>
          </motion.div>
          <motion.div
            variants={fadeInUp}
            className="mt-16 sm:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full max-w-3xl"
          >
            {highlights.map((item) => (
              <div key={item.label} className="glass-card p-4 sm:p-5 text-center">
                <p className="font-display text-2xl sm:text-3xl font-bold text-gradient mb-1">
                  {item.value}
                </p>
                <p className="text-xs sm:text-sm text-night-300">{item.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>
    </PageWrapper>
  )
}

export default Home
