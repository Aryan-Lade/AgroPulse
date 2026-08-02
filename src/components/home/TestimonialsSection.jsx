import { motion } from 'framer-motion'
import { FaStar } from 'react-icons/fa6'
import { HiOutlineChatBubbleLeftRight } from 'react-icons/hi2'
import SectionHeading from '../common/SectionHeading.jsx'
import { fadeInUp, staggerContainer } from '../../utils/motionVariants.js'

const testimonials = [
  {
    name: 'Rajesh Patel',
    role: 'Cotton Farmer · Gujarat',
    initials: 'RP',
    color: 'from-primary-400 to-emerald-600',
    rating: 5,
    quote:
      'AgriVision caught a bollworm infestation two weeks before I would have seen it. That single alert saved nearly 40% of my crop this season.',
  },
  {
    name: 'Maria Gonzalez',
    role: 'Vineyard Owner · California',
    initials: 'MG',
    color: 'from-rose-400 to-pink-600',
    rating: 5,
    quote:
      'The drone analytics changed how we manage 800 acres. NDVI maps every morning with coffee — I cannot imagine going back to manual scouting.',
  },
  {
    name: 'Samuel Okafor',
    role: 'Maize Grower · Nigeria',
    initials: 'SO',
    color: 'from-amber-400 to-orange-600',
    rating: 4,
    quote:
      'The fertilizer recommendations cut my input costs by a third while my yields went up 18%. The soil analysis alone pays for the platform.',
  },
]

function Stars({ count }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <FaStar
          key={i}
          className={`text-sm ${i < count ? 'text-amber-400' : 'text-night-700'}`}
        />
      ))}
    </div>
  )
}

function TestimonialsSection() {
  return (
    <section className="relative py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="center"
          eyebrow="Testimonials"
          title="Loved by farmers everywhere"
          description="From smallholder plots to industrial operations, growers around the world trust AgriVision AI with their harvest."
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-12 sm:mt-16 grid md:grid-cols-3 gap-5 sm:gap-6"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={fadeInUp}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="relative glass-card p-6 sm:p-7 flex flex-col gap-5 group hover:shadow-glow transition-shadow duration-300"
            >
              <HiOutlineChatBubbleLeftRight className="absolute top-6 right-6 text-3xl text-white/5 group-hover:text-primary-500/20 transition-colors" />
              <Stars count={t.rating} />
              <p className="text-sm text-night-200 leading-relaxed flex-1">
                “{t.quote}”
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <span
                  className={`size-11 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-sm font-bold text-white shadow-lg`}
                >
                  {t.initials}
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-night-400">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default TestimonialsSection
