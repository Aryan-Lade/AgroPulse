import { motion } from 'framer-motion'
import Card from '../common/Card.jsx'
import { farmHealth } from '../../data/dashboardData.js'

const RADIUS = 56
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

/**
 * FarmHealthCard — composite health score as a radial meter plus a
 * breakdown of the four factors. Meter fill uses the primary hue; the
 * unfilled track is a lighter step of the same ramp (via opacity),
 * so state reads across the whole ring.
 */
function FarmHealthCard() {
  const { score, label, breakdown } = farmHealth
  const offset = CIRCUMFERENCE * (1 - score / 100)

  return (
    <Card hover={false}>
      <h2 className="font-display font-semibold text-ink mb-1">Farm Health</h2>
      <p className="text-xs text-ink-3 mb-4">Composite score across four factors</p>

      <div className="flex items-center gap-5">
        {/* Radial score meter */}
        <div className="relative shrink-0">
          <svg width="136" height="136" viewBox="0 0 136 136" role="img" aria-label={`Farm health score ${score} out of 100 — ${label}`}>
            <circle
              cx="68"
              cy="68"
              r={RADIUS}
              fill="none"
              stroke="currentColor"
              strokeWidth="10"
              className="text-primary-500/15"
            />
            <motion.circle
              cx="68"
              cy="68"
              r={RADIUS}
              fill="none"
              stroke="currentColor"
              strokeWidth="10"
              strokeLinecap="round"
              className="text-primary-500"
              strokeDasharray={CIRCUMFERENCE}
              initial={{ strokeDashoffset: CIRCUMFERENCE }}
              whileInView={{ strokeDashoffset: offset }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: 'easeOut' }}
              transform="rotate(-90 68 68)"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-3xl font-bold text-ink">{score}</span>
            <span className="text-[11px] font-medium text-primary-400">{label}</span>
          </div>
        </div>

        {/* Factor breakdown */}
        <div className="flex-1 flex flex-col gap-3">
          {breakdown.map((factor) => (
            <div key={factor.id}>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-ink-2">{factor.label}</span>
                <span className="font-semibold text-ink">{factor.value}</span>
              </div>
              <div className="h-1.5 rounded-full bg-primary-500/15 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${factor.value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="h-full rounded-full bg-primary-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}

export default FarmHealthCard
