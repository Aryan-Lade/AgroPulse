import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  HiOutlineBugAnt,
  HiOutlineCloud,
  HiOutlineChartBar,
  HiOutlinePaperAirplane,
  HiOutlineBeaker,
  HiOutlineSparkles,
  HiArrowUpRight,
} from 'react-icons/hi2'
import SectionHeading from '../common/SectionHeading.jsx'
import { ROUTES } from '../../utils/constants.js'
import { fadeInUp, staggerContainer } from '../../utils/motionVariants.js'

const features = [
  {
    icon: HiOutlineBugAnt,
    title: 'Crop Disease Detection',
    description:
      'Snap a photo of any leaf and get an instant AI diagnosis with treatment recommendations in under 3 seconds.',
    gradient: 'from-primary-500/20 to-emerald-500/5',
    iconGradient: 'from-primary-400 to-emerald-600',
    shadow: 'hover:shadow-primary-500/20',
    to: ROUTES.DISEASE,
  },
  {
    icon: HiOutlineCloud,
    title: 'Weather Intelligence',
    description:
      'Hyperlocal forecasts, frost alerts and irrigation windows tailored to every field you manage.',
    gradient: 'from-sky-500/20 to-cyan-500/5',
    iconGradient: 'from-sky-400 to-cyan-600',
    shadow: 'hover:shadow-sky-500/20',
    to: ROUTES.WEATHER,
  },
  {
    icon: HiOutlineChartBar,
    title: 'Yield Prediction',
    description:
      'Machine learning models trained on decades of harvest data forecast your season with striking accuracy.',
    gradient: 'from-amber-500/20 to-orange-500/5',
    iconGradient: 'from-amber-400 to-orange-600',
    shadow: 'hover:shadow-amber-500/20',
    to: ROUTES.YIELD,
  },
  {
    icon: HiOutlinePaperAirplane,
    title: 'Drone Analytics',
    description:
      'Autonomous flight paths, NDVI heatmaps and anomaly detection across thousands of acres per day.',
    gradient: 'from-violet-500/20 to-purple-500/5',
    iconGradient: 'from-violet-400 to-purple-600',
    shadow: 'hover:shadow-violet-500/20',
    to: ROUTES.DRONE,
  },
  {
    icon: HiOutlineBeaker,
    title: 'Soil Analysis',
    description:
      'Real-time NPK, pH and moisture readings from field sensors, visualized zone by zone.',
    gradient: 'from-rose-500/20 to-pink-500/5',
    iconGradient: 'from-rose-400 to-pink-600',
    shadow: 'hover:shadow-rose-500/20',
    to: ROUTES.SOIL,
  },
  {
    icon: HiOutlineSparkles,
    title: 'AI Fertilizer Recommendation',
    description:
      'Precision nutrient plans generated from soil chemistry, crop stage and weather — cutting waste by up to 30%.',
    gradient: 'from-emerald-500/20 to-teal-500/5',
    iconGradient: 'from-emerald-400 to-teal-600',
    shadow: 'hover:shadow-emerald-500/20',
    to: ROUTES.SOIL,
  },
]

function FeaturesSection() {
  return (
    <section id="features" className="relative py-16 sm:py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="center"
          eyebrow="Features"
          title="Everything your farm needs, in one platform"
          description="Six intelligent modules working together to help you grow more with less — powered by computer vision, satellite data and machine learning."
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-12 sm:mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={fadeInUp}>
              <Link to={feature.to} className="block h-full group">
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className={`relative h-full glass-card p-6 sm:p-7 overflow-hidden shadow-lg ${feature.shadow} hover:shadow-2xl transition-shadow duration-300`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />
                  <div className="relative">
                    <div
                      className={`mb-5 size-13 rounded-2xl bg-gradient-to-br ${feature.iconGradient} flex items-center justify-center text-white text-2xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}
                    >
                      <feature.icon />
                    </div>
                    <h3 className="font-display text-lg font-bold text-white mb-2.5 flex items-center gap-2">
                      {feature.title}
                      <HiArrowUpRight className="text-sm text-primary-300 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </h3>
                    <p className="text-sm text-night-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturesSection
