import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiArrowRight, HiOutlineArrowTopRightOnSquare } from 'react-icons/hi2'
import Button from '../common/Button.jsx'
import { ROUTES } from '../../utils/constants.js'
import { fadeInUp, staggerContainer, EASE } from '../../utils/motionVariants.js'

function CTASection() {
  return (
    <section className="force-dark relative py-24 sm:py-32 overflow-hidden">
      {}
      <div className="absolute inset-0 bg-night-950">
        <div className="absolute inset-0 bg-mesh" />
      </div>

      {}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-20 left-1/3 size-96 rounded-full bg-primary-500/20 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.15, 1.1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute -bottom-20 right-1/4 size-80 rounded-full bg-emerald-500/15 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          className="absolute top-1/2 -translate-y-1/2 left-10 size-64 rounded-full bg-accent-sky/10 blur-3xl"
        />
      </div>

      {}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgb(255 255 255 / 1) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary-500/40 to-transparent" />
      {}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary-500/20 to-transparent" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="flex flex-col items-center gap-6"
        >
          {}
          <motion.span
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs sm:text-sm font-medium text-primary-300"
          >
            <span className="size-1.5 rounded-full bg-primary-400 animate-pulse-slow" />
            Powering 25,000+ Farms Worldwide
          </motion.span>

          {}
          <motion.h2
            variants={fadeInUp}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] text-balance"
          >
            Make Smarter{' '}
            <span className="text-gradient-animated">Farming Decisions</span>
          </motion.h2>

          {}
          <motion.p
            variants={fadeInUp}
            className="max-w-xl text-night-300 text-base sm:text-lg leading-relaxed"
          >
            Join thousands of farmers using AI to grow more with less. From
            real-time crop health alerts to precision fertilizer plans — your
            intelligent farm companion is ready.
          </motion.p>

          {}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center gap-4 pt-2"
          >
            <Link to={ROUTES.DASHBOARD}>
              <Button size="lg" icon={HiArrowRight}>
                Start Monitoring
              </Button>
            </Link>
            <Link to={ROUTES.DASHBOARD}>
              <Button size="lg" variant="secondary" icon={HiOutlineArrowTopRightOnSquare}>
                Explore Dashboard
              </Button>
            </Link>
          </motion.div>

          {}
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 pt-4"
          >
            {[
              { value: '25K+', label: 'Active Farmers' },
              { value: '98%', label: 'Detection Accuracy' },
              { value: '40%', label: 'Yield Increase Avg.' },
              { value: '30%', label: 'Input Cost Saved' },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center gap-0.5">
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="font-display text-2xl font-bold text-gradient"
                >
                  {value}
                </motion.span>
                <span className="text-xs text-night-400 font-medium">{label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default CTASection
