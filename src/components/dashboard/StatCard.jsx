import { motion } from 'framer-motion'
import { HiArrowTrendingUp, HiArrowTrendingDown, HiMinusSmall } from 'react-icons/hi2'
import Card from '../common/Card.jsx'
import Badge from '../common/Badge.jsx'
import { formatNumber } from '../../utils/formatters.js'

function StatCard({ label, value, unit, trend, status, icon: Icon }) {
  const TrendIcon =
    trend > 0 ? HiArrowTrendingUp : trend < 0 ? HiArrowTrendingDown : HiMinusSmall
  const trendColor =
    trend > 0 ? 'text-primary-400' : trend < 0 ? 'text-accent-rose' : 'text-night-400'

  return (
    <Card className="relative overflow-hidden">
      <div className="absolute -top-8 -right-8 size-28 rounded-full bg-primary-500/10 blur-2xl" />
      <div className="flex items-start justify-between mb-4">
        {Icon && (
          <span className="size-11 rounded-xl bg-primary-500/15 flex items-center justify-center text-primary-300 text-xl">
            <Icon />
          </span>
        )}
        {status && <Badge status={status}>{status}</Badge>}
      </div>
      <p className="text-sm text-night-300 mb-1">{label}</p>
      <div className="flex items-end gap-2 flex-wrap">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-3xl font-bold text-white"
        >
          {formatNumber(value)}
          {unit && <span className="text-lg text-night-300 ml-1">{unit}</span>}
        </motion.span>
        <span className={`flex items-center gap-1 text-xs font-medium ${trendColor} pb-1.5`}>
          <TrendIcon className="text-sm" />
          {trend !== 0 && `${Math.abs(trend)}%`}
        </span>
      </div>
    </Card>
  )
}

export default StatCard
