import { motion } from 'framer-motion'
import {
  HiOutlineHeart,
  HiOutlineBeaker,
  HiOutlinePaperAirplane,
  HiOutlineChartBar,
} from 'react-icons/hi2'
import PageWrapper from '../components/common/PageWrapper.jsx'
import StatCard from '../components/dashboard/StatCard.jsx'
import Card from '../components/common/Card.jsx'
import Badge from '../components/common/Badge.jsx'
import { dashboardStats } from '../data/dashboardData.js'
import { staggerContainer, fadeInUp } from '../utils/motionVariants.js'

const statIcons = {
  'crop-health': HiOutlineHeart,
  'soil-moisture': HiOutlineBeaker,
  'active-drones': HiOutlinePaperAirplane,
  'yield-forecast': HiOutlineChartBar,
}

function Dashboard() {
  return (
    <PageWrapper className="flex flex-col gap-6">
      <motion.div variants={fadeInUp} initial="hidden" animate="visible">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-white">
          Farm Overview
        </h1>
        <p className="text-sm text-night-300 mt-1">
          Live snapshot of Greenfield Farm — Thursday, July 31
        </p>
      </motion.div>

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
        <Card className="lg:col-span-2" hover={false}>
          <h2 className="font-display font-semibold text-white mb-1">Fields</h2>
          <p className="text-xs text-night-400 mb-4">
            Health index across active plots
          </p>
          <div className="flex flex-col gap-3">
            {dashboardStats.fields.map((field) => (
              <div
                key={field.id}
                className="flex items-center gap-4 glass rounded-xl px-4 py-3"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">
                    {field.name}
                  </p>
                  <p className="text-xs text-night-400">
                    {field.crop} · {field.area} ha
                  </p>
                </div>
                <div className="hidden sm:block w-32">
                  <div className="h-2 rounded-full bg-night-800 overflow-hidden">
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
                <span className="text-sm font-bold text-white w-10 text-right">
                  {field.health}%
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card hover={false}>
          <h2 className="font-display font-semibold text-white mb-1">Alerts</h2>
          <p className="text-xs text-night-400 mb-4">Latest farm notifications</p>
          <ul className="flex flex-col gap-3">
            {dashboardStats.alerts.map((alert) => (
              <li key={alert.id} className="glass rounded-xl px-4 py-3">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <Badge status={alert.severity}>{alert.severity}</Badge>
                  <span className="text-[11px] text-night-400 shrink-0">
                    {alert.time}
                  </span>
                </div>
                <p className="text-sm text-night-100">{alert.title}</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </PageWrapper>
  )
}

export default Dashboard
