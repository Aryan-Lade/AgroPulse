import { motion } from 'framer-motion'
import {
  HiOutlineUserGroup,
  HiOutlineShieldCheck,
  HiOutlineGlobeAmericas,
  HiOutlineCpuChip,
} from 'react-icons/hi2'
import AnimatedCounter from './AnimatedCounter.jsx'
import { fadeInUp, staggerContainer } from '../../utils/motionVariants.js'

const stats = [
  {
    icon: HiOutlineUserGroup,
    target: 25000,
    suffix: '+',
    label: 'Happy Farmers',
    color: 'text-primary-300',
    glow: 'bg-primary-500/10',
  },
  {
    icon: HiOutlineShieldCheck,
    target: 98.2,
    decimals: 1,
    suffix: '%',
    label: 'Disease Detection Accuracy',
    color: 'text-sky-300',
    glow: 'bg-accent-sky/10',
  },
  {
    icon: HiOutlineGlobeAmericas,
    target: 140000,
    suffix: '+',
    label: 'Acres Monitored',
    color: 'text-amber-300',
    glow: 'bg-accent-amber/10',
  },
  {
    icon: HiOutlineCpuChip,
    target: 1200000,
    suffix: '+',
    label: 'AI Predictions',
    color: 'text-emerald-300',
    glow: 'bg-emerald-500/10',
  },
]

function StatsSection() {
  return (
    <section className="relative py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeInUp}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="glass-card p-5 sm:p-7 text-center group"
            >
              <div
                className={`mx-auto mb-4 size-12 rounded-2xl ${stat.glow} flex items-center justify-center ${stat.color} text-2xl group-hover:scale-110 transition-transform`}
              >
                <stat.icon />
              </div>
              <p className="font-display text-2xl sm:text-4xl font-bold text-white mb-1">
                <AnimatedCounter
                  target={stat.target}
                  decimals={stat.decimals}
                  suffix={stat.suffix}
                />
              </p>
              <p className="text-xs sm:text-sm text-night-300">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default StatsSection
