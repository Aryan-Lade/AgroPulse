import { Link } from 'react-router-dom'
import { HiOutlineBugAnt, HiOutlineArrowRight } from 'react-icons/hi2'
import Card from '../common/Card.jsx'
import Badge from '../common/Badge.jsx'
import { recentDetection } from '../../data/dashboardData.js'
import { ROUTES } from '../../utils/constants.js'
import { formatDate } from '../../utils/formatters.js'

/** RecentDetectionCard — latest AI disease scan result with action. */
function RecentDetectionCard() {
  return (
    <Card hover={false} className="flex flex-col">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <span className="size-11 rounded-xl bg-accent-rose/15 flex items-center justify-center text-accent-rose text-xl">
            <HiOutlineBugAnt />
          </span>
          <div>
            <h2 className="font-display font-semibold text-ink">Latest Detection</h2>
            <p className="text-xs text-ink-3">
              {formatDate(recentDetection.scannedAt, {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        </div>
        <Badge status={recentDetection.severity}>{recentDetection.severity}</Badge>
      </div>

      <p className="text-sm font-semibold text-ink">{recentDetection.disease}</p>
      <p className="text-xs text-ink-3 mt-0.5">
        {recentDetection.crop} · {recentDetection.field}
      </p>

      {/* Confidence meter */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-ink-2">Model confidence</span>
          <span className="font-semibold text-ink">{recentDetection.confidence}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-accent-rose/15 overflow-hidden">
          <div
            className="h-full rounded-full bg-accent-rose"
            style={{ width: `${recentDetection.confidence}%` }}
          />
        </div>
      </div>

      <p className="text-xs text-ink-2 leading-relaxed mt-4 glass rounded-xl px-3.5 py-3">
        💊 {recentDetection.action}
      </p>

      <Link
        to={ROUTES.DISEASE}
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary-400 hover:text-primary-300 transition-colors"
      >
        Open Disease Detection
        <HiOutlineArrowRight className="text-base" />
      </Link>
    </Card>
  )
}

export default RecentDetectionCard
