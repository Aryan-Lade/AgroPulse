import { motion } from 'framer-motion'
import {
  HiOutlineArrowUpTray,
  HiOutlineMagnifyingGlass,
  HiOutlineArrowTrendingUp,
} from 'react-icons/hi2'
import SectionHeading from '../common/SectionHeading.jsx'
import { fadeInUp, staggerContainer } from '../../utils/motionVariants.js'

const steps = [
  {
    number: '01',
    icon: HiOutlineArrowUpTray,
    title: 'Upload',
    description:
      'Capture field photos, drone imagery or connect your soil sensors. AgriVision ingests any farm data in seconds.',
    gradient: 'from-primary-400 to-emerald-600',
  },
  {
    number: '02',
    icon: HiOutlineMagnifyingGlass,
    title: 'Analyze',
    description:
      'Our AI models scan for diseases, stress patterns and nutrient gaps — then translate findings into plain language.',
    gradient: 'from-sky-400 to-cyan-600',
  },
  {
    number: '03',
    icon: HiOutlineArrowTrendingUp,
    title: 'Improve',
    description:
      'Act on precise recommendations, track results across seasons and watch your yields climb year over year.',
    gradient: 'from-amber-400 to-orange-600',
  },
]

function HowItWorksSection() {
  return (
    <section className="relative py-16 sm:py-24">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 size-96 rounded-full bg-primary-500/8 blur-3xl" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="center"
          eyebrow="How It Works"
          title="From field to insight in three steps"
          description="No agronomy degree required. AgriVision turns raw farm data into clear, confident decisions."
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-12 sm:mt-16 grid md:grid-cols-3 gap-6 lg:gap-8 relative"
        >
          <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-px bg-gradient-to-r from-primary-500/40 via-sky-500/40 to-amber-500/40" />
          {steps.map((step) => (
            <motion.div
              key={step.number}
              variants={fadeInUp}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="relative glass-card p-7 sm:p-8 text-center group"
            >
              <span className="absolute top-5 right-6 font-display text-4xl font-extrabold text-white/5 group-hover:text-white/10 transition-colors">
                {step.number}
              </span>
              <div
                className={`mx-auto mb-6 size-16 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                <step.icon />
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-3">
                {step.title}
              </h3>
              <p className="text-sm text-night-300 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default HowItWorksSection
