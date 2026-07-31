import { motion } from 'framer-motion'
import PageWrapper from './PageWrapper.jsx'
import { fadeInUp } from '../../utils/motionVariants.js'

function ModuleShell({ icon: Icon, title, description, accent = 'primary' }) {
  const accents = {
    primary: 'from-primary-500/20 to-primary-700/10 text-primary-300',
    sky: 'from-accent-sky/20 to-sky-700/10 text-sky-300',
    amber: 'from-accent-amber/20 to-amber-700/10 text-amber-300',
    rose: 'from-accent-rose/20 to-rose-700/10 text-rose-300',
  }

  return (
    <PageWrapper>
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="glass-card flex flex-col items-center justify-center text-center gap-5 py-20 sm:py-28 px-6"
      >
        {Icon && (
          <span
            className={`size-16 rounded-2xl bg-gradient-to-br ${accents[accent]} flex items-center justify-center text-3xl animate-float`}
          >
            <Icon />
          </span>
        )}
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
            {title}
          </h1>
          <p className="max-w-md mx-auto text-sm sm:text-base text-night-300 leading-relaxed">
            {description}
          </p>
        </div>
        <span className="px-4 py-1.5 rounded-full glass text-xs font-semibold uppercase tracking-widest text-primary-300">
          Module coming soon
        </span>
      </motion.div>
    </PageWrapper>
  )
}

export default ModuleShell
