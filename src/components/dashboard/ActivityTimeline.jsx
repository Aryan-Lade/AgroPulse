import {
  HiOutlineBugAnt,
  HiOutlineCloud,
  HiOutlineChartBar,
  HiOutlinePaperAirplane,
  HiOutlineBeaker,
} from 'react-icons/hi2'
import Card from '../common/Card.jsx'
import { recentActivities } from '../../data/dashboardData.js'

const typeIcons = {
  scan: HiOutlineBugAnt,
  weather: HiOutlineCloud,
  yield: HiOutlineChartBar,
  drone: HiOutlinePaperAirplane,
  soil: HiOutlineBeaker,
}

/** ActivityTimeline — recent platform events as a vertical timeline. */
function ActivityTimeline() {
  return (
    <Card hover={false}>
      <h2 className="font-display font-semibold text-ink mb-1">Recent Activity</h2>
      <p className="text-xs text-ink-3 mb-4">Latest events across your farm</p>
      <ol className="relative flex flex-col gap-5 before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-px before:bg-line-2">
        {recentActivities.map((activity) => {
          const Icon = typeIcons[activity.type] ?? HiOutlineChartBar
          return (
            <li key={activity.id} className="relative flex gap-3.5">
              <span className="relative z-10 size-9 shrink-0 rounded-xl glass-strong flex items-center justify-center text-primary-400">
                <Icon className="text-base" />
              </span>
              <div className="min-w-0 pt-0.5">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-sm font-semibold text-ink truncate">{activity.title}</p>
                  <span className="text-[11px] text-ink-3 shrink-0">{activity.time}</span>
                </div>
                <p className="text-xs text-ink-2 mt-0.5 leading-relaxed">{activity.detail}</p>
              </div>
            </li>
          )
        })}
      </ol>
    </Card>
  )
}

export default ActivityTimeline
