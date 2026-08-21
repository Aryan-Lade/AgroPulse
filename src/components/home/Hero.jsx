import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { HiArrowRight, HiOutlineSparkles, HiPlayCircle } from 'react-icons/hi2'
import Button from '../common/Button.jsx'
import TextReveal from '../common/TextReveal.jsx'
import Particles from '../common/Particles.jsx'
import FarmIllustration from './FarmIllustration.jsx'
import { ROUTES } from '../../utils/constants.js'
import { fadeInUp, staggerContainer, slideInRight, EASE } from '../../utils/motionVariants.js'

function Hero() {
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const orbY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const illustrationY = useTransform(scrollYProgress, [0, 1], [0, 60])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 40])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.3])

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {}
      <motion.div style={{ y: orbY }} className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-24 left-1/4 size-72 rounded-full bg-primary-500/15 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-0 right-1/4 size-80 rounded-full bg-accent-sky/10 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 right-10 size-64 rounded-full bg-primary-700/10 blur-3xl"
        />
      </motion.div>

      {}
      <Particles count={18} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-20 lg:pt-24 pb-16 lg:pb-24 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          style={{ y: contentY, opacity: contentOpacity }}
          className="flex flex-col items-center lg:items-start text-center lg:text-left"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs sm:text-sm font-medium text-primary-300 mb-6"
          >
            <motion.span
              animate={{ rotate: [0, 12, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="flex"
            >
              <HiOutlineSparkles className="text-base" />
            </motion.span>
            Next-Gen Smart Farming Platform
          </motion.span>

          {}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white text-balance leading-[1.1] mb-6">
            <TextReveal text="AI Powered" as="span" className="inline" />{' '}
            <TextReveal
              text="Precision Agriculture"
              as="span"
              delay={0.35}
              className="inline text-gradient-animated"
            />
          </h1>

          <motion.p
            variants={fadeInUp}
            className="max-w-xl text-night-300 text-base sm:text-lg leading-relaxed mb-10"
          >
            Detect crop diseases in seconds, forecast yields with confidence,
            and command your drone fleet — all from one intelligent dashboard
            built for the modern farmer.
          </motion.p>

          {}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Link to={ROUTES.REGISTER}>
              <Button size="lg" icon={HiArrowRight}>
                Start Monitoring
              </Button>
            </Link>
            <Link to={ROUTES.LOGIN}>
              <Button size="lg" variant="secondary" icon={HiPlayCircle}>
                Live Demo
              </Button>
            </Link>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="mt-10 flex items-center gap-4"
          >
            <div className="flex -space-x-2">
              {['bg-primary-500', 'bg-accent-sky', 'bg-accent-amber', 'bg-emerald-500'].map(
                (color, i) => (
                  <motion.span
                    key={color}
                    initial={{ opacity: 0, scale: 0, x: -8 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ delay: 0.9 + i * 0.08, duration: 0.4, ease: EASE }}
                    className={`size-8 rounded-full ${color} border-2 border-night-950 flex items-center justify-center text-[10px] font-bold text-white`}
                  >
                    🌾
                  </motion.span>
                ),
              )}
            </div>
            <p className="text-xs sm:text-sm text-night-300">
              Trusted by <span className="text-white font-semibold">25,000+</span>{' '}
              farmers worldwide
            </p>
          </motion.div>
        </motion.div>

        {}
        <motion.div
          variants={slideInRight}
          initial="hidden"
          animate="visible"
          style={{ y: illustrationY }}
          className="relative"
        >
          <FarmIllustration />
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
