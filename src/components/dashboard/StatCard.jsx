import { HiArrowTrendingUp, HiArrowTrendingDown, HiMinusSmall } from 'react-icons/hi2'
import { motion } from 'framer-motion'
import Card from '../common/Card.jsx'
import Badge from '../common/Badge.jsx'
import CountUp from '../common/CountUp.jsx'

function StatCard({ label, value, unit, trend, status, icon: Icon }) {
  const TrendIcon =
    trend > 0 ? HiArrowTrendingUp : trend < 0 ? HiArrowTrendingDown : HiMinusSmall
  const trendColor =
    trend > 0 ? 'text-primary-400' : trend < 0 ? 'text-accent-rose' : 'text-night-400'
  const decimals = Number.isInteger(value) ? 0 : 1

  return (
    <Card className="relative overflow-hidden group">
      <div className="absolute -top-8 -right-8 size-28 rounded-full bg-primary-500/10 blur-2xl transition-transform duration-500 group-hover:scale-150" />
      <div className="flex items-start justify-between mb-4">
        {Icon && (
          <motion.span
            whileHover={{ scale: 1.1, rotate: 4 }}
            transition={{ type: 'spring', stiffness: 400, damping: 22 }}
            className="size-11 rounded-xl bg-primary-500/15 flex items-center justify-center text-primary-300 text-xl"
          >
            <Icon />
          </motion.span>
        )}
        {status && <Badge status={status}>{status}</Badge>}
      </div>
      <p className="text-sm text-night-300 mb-1">{label}</p>
      <div className="flex items-end gap-2 flex-wrap">
        <span className="font-display text-3xl font-bold text-white">
          <CountUp value={value} decimals={decimals} />
          {unit && <span className="text-lg text-night-300 ml-1">{unit}</span>}
        </span>
        <motion.span
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className={`flex items-center gap-1 text-xs font-medium ${trendColor} pb-1.5`}
        >
          <TrendIcon className="text-sm" />
          {trend !== 0 && `${Math.abs(trend)}%`}
        </motion.span>
      </div>
    </Card>
  )
}

export default StatCard
