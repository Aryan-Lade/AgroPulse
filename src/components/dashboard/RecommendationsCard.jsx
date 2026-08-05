import { HiOutlineLightBulb } from 'react-icons/hi2'
import Card from '../common/Card.jsx'
import { aiRecommendations } from '../../data/dashboardData.js'
import { classNames } from '../../utils/formatters.js'

const impactStyles = {
  high: 'bg-accent-rose/15 text-badge-rose',
  medium: 'bg-accent-amber/15 text-badge-amber',
  low: 'bg-accent-sky/15 text-badge-sky',
}

/** RecommendationsCard — prioritized AI advisory list. */
function RecommendationsCard() {
  return (
    <Card hover={false}>
      <div className="flex items-center gap-3 mb-4">
        <span className="size-11 rounded-xl bg-accent-amber/15 flex items-center justify-center text-accent-amber text-xl">
          <HiOutlineLightBulb />
        </span>
        <div>
          <h2 className="font-display font-semibold text-ink">AI Recommendations</h2>
          <p className="text-xs text-ink-3">Ranked by impact for today</p>
        </div>
      </div>
      <ul className="flex flex-col gap-3">
        {aiRecommendations.map((rec) => (
          <li key={rec.id} className="glass rounded-xl px-4 py-3">
            <div className="flex items-center justify-between gap-2 mb-1">
              <p className="text-sm font-semibold text-ink">{rec.title}</p>
              <span
                className={classNames(
                  'shrink-0 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider',
                  impactStyles[rec.impact],
                )}
              >
                {rec.impact}
              </span>
            </div>
            <p className="text-xs text-ink-2 leading-relaxed">{rec.detail}</p>
            <p className="text-[11px] text-ink-3 mt-1.5">{rec.category}</p>
          </li>
        ))}
      </ul>
    </Card>
  )
}

export default RecommendationsCard
