import { Link } from 'react-router-dom'
import {
  HiOutlineCamera,
  HiOutlineBeaker,
  HiOutlineChartBar,
  HiOutlineCloud,
  HiOutlinePaperAirplane,
  HiOutlineDocumentArrowDown,
} from 'react-icons/hi2'
import Card from '../common/Card.jsx'
import { quickActions } from '../../data/dashboardData.js'
import { ROUTES } from '../../utils/constants.js'
import { classNames } from '../../utils/formatters.js'

const actionMeta = {
  'upload-leaf': { icon: HiOutlineCamera, to: ROUTES.DISEASE },
  'scan-soil': { icon: HiOutlineBeaker, to: ROUTES.SOIL },
  'predict-yield': { icon: HiOutlineChartBar, to: ROUTES.YIELD },
  'view-weather': { icon: HiOutlineCloud, to: ROUTES.WEATHER },
  'drone-analysis': { icon: HiOutlinePaperAirplane, to: ROUTES.DRONE },
  'pdf-report': { icon: HiOutlineDocumentArrowDown, to: ROUTES.REPORTS },
}

const accentStyles = {
  primary: 'bg-primary-500/15 text-primary-400',
  amber: 'bg-accent-amber/15 text-accent-amber',
  violet: 'bg-purple-500/15 text-purple-400',
  sky: 'bg-accent-sky/15 text-accent-sky',
  rose: 'bg-accent-rose/15 text-accent-rose',
  emerald: 'bg-emerald-500/15 text-emerald-400',
}

/** QuickActionsGrid — one-tap shortcuts into each module. */
function QuickActionsGrid() {
  return (
    <Card hover={false}>
      <h2 className="font-display font-semibold text-ink mb-1">Quick Actions</h2>
      <p className="text-xs text-ink-3 mb-4">Jump straight into a workflow</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {quickActions.map((action) => {
          const meta = actionMeta[action.id]
          const Icon = meta?.icon ?? HiOutlineChartBar
          return (
            <Link
              key={action.id}
              to={meta?.to ?? ROUTES.DASHBOARD}
              className="group glass rounded-xl p-4 flex flex-col gap-2.5 hover:bg-surface-2 hover:-translate-y-0.5 transition-all duration-200"
            >
              <span
                className={classNames(
                  'size-10 rounded-xl flex items-center justify-center text-lg transition-transform duration-200 group-hover:scale-110',
                  accentStyles[action.accent] ?? accentStyles.primary,
                )}
              >
                <Icon />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink leading-tight">{action.label}</p>
                <p className="text-[11px] text-ink-3 mt-0.5">{action.description}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </Card>
  )
}

export default QuickActionsGrid
