import { motion } from 'framer-motion'
import {
  HiOutlineHeart,
  HiOutlineBeaker,
  HiOutlinePaperAirplane,
  HiOutlineChartBar,
} from 'react-icons/hi2'
import PageWrapper from '../components/common/PageWrapper.jsx'
import Card from '../components/common/Card.jsx'
import Badge from '../components/common/Badge.jsx'
import StatCard from '../components/dashboard/StatCard.jsx'
import WeatherCard from '../components/dashboard/WeatherCard.jsx'
import FarmHealthCard from '../components/dashboard/FarmHealthCard.jsx'
import RecentDetectionCard from '../components/dashboard/RecentDetectionCard.jsx'
import CropStatusList from '../components/dashboard/CropStatusList.jsx'
import RecommendationsCard from '../components/dashboard/RecommendationsCard.jsx'
import ActivityTimeline from '../components/dashboard/ActivityTimeline.jsx'
import QuickActionsGrid from '../components/dashboard/QuickActionsGrid.jsx'
import ReportsTable from '../components/dashboard/ReportsTable.jsx'
import QuickInsightsPanel from '../components/dashboard/QuickInsightsPanel.jsx'
import DiseaseFrequencyChart from '../components/charts/DiseaseFrequencyChart.jsx'
import YieldTrendChart from '../components/charts/YieldTrendChart.jsx'
import WeatherTrendsChart from '../components/charts/WeatherTrendsChart.jsx'
import SoilNutrientsChart from '../components/charts/SoilNutrientsChart.jsx'
import CropDistributionChart from '../components/charts/CropDistributionChart.jsx'
import RainfallPredictionChart from '../components/charts/RainfallPredictionChart.jsx'
import { dashboardStats, todaysAlerts, currentUser } from '../data/dashboardData.js'
import { staggerContainer, fadeInUp } from '../utils/motionVariants.js'
import { formatDate } from '../utils/formatters.js'

const statIcons = {
  'crop-health': HiOutlineHeart,
  'soil-moisture': HiOutlineBeaker,
  'active-drones': HiOutlinePaperAirplane,
  'yield-forecast': HiOutlineChartBar,
}

/** Fields card — health index bars across active plots. */
function FieldsCard() {
  return (
    <Card hover={false}>
      <h2 className="font-display font-semibold text-ink mb-1">Fields</h2>
      <p className="text-xs text-ink-3 mb-4">Health index across active plots</p>
      <div className="flex flex-col gap-3">
        {dashboardStats.fields.map((field) => (
          <div key={field.id} className="flex items-center gap-4 glass rounded-xl px-4 py-3">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-ink truncate">{field.name}</p>
              <p className="text-xs text-ink-3">
                {field.crop} · {field.area} ha
              </p>
            </div>
            <div className="hidden sm:block w-32">
              <div className="h-2 rounded-full bg-surface-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${field.health}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className={`h-full rounded-full ${
                    field.health >= 90
                      ? 'bg-primary-500'
                      : field.health >= 80
                        ? 'bg-accent-amber'
                        : 'bg-accent-rose'
                  }`}
                />
              </div>
            </div>
            <span className="text-sm font-bold text-ink w-10 text-right">{field.health}%</span>
          </div>
        ))}
      </div>
    </Card>
  )
}

/** Alerts card — today's farm notifications. */
function AlertsCard() {
  return (
    <Card hover={false}>
      <h2 className="font-display font-semibold text-ink mb-1">Today's Alerts</h2>
      <p className="text-xs text-ink-3 mb-4">Time-sensitive farm warnings</p>
      <ul className="flex flex-col gap-3">
        {todaysAlerts.map((alert) => (
          <li key={alert.id} className="glass rounded-xl px-4 py-3">
            <div className="flex items-start justify-between gap-2 mb-1">
              <Badge status={alert.severity}>{alert.severity}</Badge>
              <span className="text-[11px] text-ink-3 shrink-0">{alert.time}</span>
            </div>
            <p className="text-sm font-semibold text-ink">{alert.title}</p>
            <p className="text-xs text-ink-2 mt-0.5 leading-relaxed">{alert.detail}</p>
          </li>
        ))}
      </ul>
    </Card>
  )
}

/**
 * Dashboard — main farm overview. Two-column shell: fluid content grid
 * plus the fixed Quick Insights rail on very wide screens.
 */
function Dashboard() {
  const today = formatDate(new Date('2026-08-03'), {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  return (
    <PageWrapper>
      <div className="flex gap-6">
        {/* Main column */}
        <div className="flex-1 min-w-0 flex flex-col gap-5 sm:gap-6">
          {/* Heading */}
          <motion.div variants={fadeInUp} initial="hidden" animate="visible">
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink">
              Farm Overview
            </h1>
            <p className="text-sm text-ink-2 mt-1">
              Welcome back, {currentUser.name.split(' ')[0]} — {currentUser.farm}, {today}
            </p>
          </motion.div>

          {/* KPI strip */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5"
          >
            {dashboardStats.summary.map((stat) => (
              <StatCard key={stat.id} {...stat} icon={statIcons[stat.id]} />
            ))}
          </motion.div>

          {/* Weather · farm health · latest detection */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
            <WeatherCard />
            <FarmHealthCard />
            <RecentDetectionCard />
          </div>

          {/* Charts — row 1 */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-5">
            <YieldTrendChart />
            <DiseaseFrequencyChart />
          </div>

          {/* Charts — row 2 */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-5">
            <SoilNutrientsChart />
            <WeatherTrendsChart />
          </div>

          {/* Charts — row 3 */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-5">
            <CropDistributionChart />
            <RainfallPredictionChart />
          </div>

          {/* Fields · alerts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
            <div className="lg:col-span-2">
              <FieldsCard />
            </div>
            <AlertsCard />
          </div>

          {/* Status · recommendations · activity */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
            <CropStatusList />
            <RecommendationsCard />
            <ActivityTimeline />
          </div>

          {/* Quick actions + reports */}
          <QuickActionsGrid />
          <ReportsTable />
        </div>

        {/* Right insights rail (2xl+) */}
        <QuickInsightsPanel />
      </div>
    </PageWrapper>
  )
}

export default Dashboard
