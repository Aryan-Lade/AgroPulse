import { motion } from 'framer-motion'
import {
  HiOutlineChartPie,
  HiOutlineBeaker,
  HiOutlineCalendarDays,
  HiOutlineBanknotes,
  HiOutlineCheckCircle,
  HiOutlineArrowTrendingUp,
  HiOutlineArrowTrendingDown,
} from 'react-icons/hi2'
import { quickInsights } from '../../data/dashboardData.js'
import { classNames, formatNumber } from '../../utils/formatters.js'

/** Small labelled section inside the insights rail. */
function InsightSection({ icon: Icon, title, children }) {
  return (
    <section className="glass rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <Icon className="text-base text-primary-400" />
        <h3 className="text-xs font-semibold uppercase tracking-widest text-ink-3">{title}</h3>
      </div>
      {children}
    </section>
  )
}

/**
 * QuickInsightsPanel — fixed right rail, desktop (2xl) only.
 * Surfaces NDVI, irrigation window, harvest countdown, market prices
 * and pending tasks without crowding the main content grid.
 */
function QuickInsightsPanel() {
  const { ndvi, irrigation, harvest, market, tasks } = quickInsights

  return (
    <motion.aside
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="hidden 2xl:flex flex-col gap-4 w-72 shrink-0"
      aria-label="Quick insights"
    >
      <h2 className="font-display font-semibold text-ink text-sm px-1">Quick Insights</h2>

      {/* NDVI */}
      <InsightSection icon={HiOutlineChartPie} title={ndvi.label}>
        <div className="flex items-end gap-2">
          <span className="font-display text-3xl font-bold text-ink">{ndvi.value}</span>
          <span className="flex items-center gap-1 text-xs font-medium text-primary-400 pb-1">
            <HiOutlineArrowTrendingUp /> +{ndvi.delta}
          </span>
        </div>
        <p className="text-xs text-ink-3 mt-1">vs last drone survey</p>
      </InsightSection>

      {/* Irrigation */}
      <InsightSection icon={HiOutlineBeaker} title="Next Irrigation">
        <p className="text-sm font-semibold text-ink">{irrigation.nextWindow}</p>
        <p className="text-xs text-ink-3 mt-0.5">{irrigation.zones.join(', ')}</p>
      </InsightSection>

      {/* Harvest countdown */}
      <InsightSection icon={HiOutlineCalendarDays} title="Harvest Window">
        <p className="text-sm font-semibold text-ink">
          {harvest.crop} · <span className="text-primary-400">{harvest.daysLeft} days</span>
        </p>
        <p className="text-xs text-ink-3 mt-0.5">Optimal window approaching</p>
      </InsightSection>

      {/* Market prices */}
      <InsightSection icon={HiOutlineBanknotes} title="Market Prices">
        <ul className="flex flex-col gap-2.5">
          {market.map((item) => {
            const up = item.delta >= 0
            const DeltaIcon = up ? HiOutlineArrowTrendingUp : HiOutlineArrowTrendingDown
            return (
              <li key={item.crop} className="flex items-center justify-between text-sm">
                <span className="text-ink-2">{item.crop}</span>
                <span className="flex items-center gap-2">
                  <span className="font-semibold text-ink">
                    {formatNumber(item.price)} <span className="text-[10px] text-ink-3">{item.unit}</span>
                  </span>
                  <span
                    className={classNames(
                      'flex items-center gap-0.5 text-[11px] font-medium',
                      up ? 'text-primary-400' : 'text-accent-rose',
                    )}
                  >
                    <DeltaIcon className="text-xs" />
                    {Math.abs(item.delta)}%
                  </span>
                </span>
              </li>
            )
          })}
        </ul>
      </InsightSection>

      {/* Tasks */}
      <InsightSection icon={HiOutlineCheckCircle} title="Pending Tasks">
        <ul className="flex flex-col gap-2">
          {tasks.map((task) => (
            <li key={task.id} className="flex items-center gap-2.5 text-sm">
              <span
                className={classNames(
                  'size-4 rounded-full border flex items-center justify-center shrink-0',
                  task.done
                    ? 'border-primary-500 bg-primary-500/20 text-primary-400'
                    : 'border-line-2',
                )}
              >
                {task.done && <HiOutlineCheckCircle className="text-xs" />}
              </span>
              <span className={classNames(task.done ? 'text-ink-3 line-through' : 'text-ink-2')}>
                {task.label}
              </span>
            </li>
          ))}
        </ul>
      </InsightSection>
    </motion.aside>
  )
}

export default QuickInsightsPanel
