import Card from '../common/Card.jsx'
import Badge from '../common/Badge.jsx'
import { cropStatus } from '../../data/dashboardData.js'

/** CropStatusList — per-crop condition with agronomist note. */
function CropStatusList() {
  return (
    <Card hover={false}>
      <h2 className="font-display font-semibold text-ink mb-1">Crop Status</h2>
      <p className="text-xs text-ink-3 mb-4">Condition by crop and field</p>
      <ul className="flex flex-col gap-3">
        {cropStatus.map((item) => (
          <li key={item.id} className="glass rounded-xl px-4 py-3">
            <div className="flex items-center justify-between gap-2 mb-1">
              <p className="text-sm font-semibold text-ink">
                {item.crop}
                <span className="font-normal text-ink-3"> · {item.field}</span>
              </p>
              <Badge status={item.status}>{item.status}</Badge>
            </div>
            <p className="text-xs text-ink-2">{item.note}</p>
          </li>
        ))}
      </ul>
    </Card>
  )
}

export default CropStatusList
