import Card from '../common/Card.jsx'

function ChartCard({ title, subtitle, actions, children, className }) {
  return (
    <Card hover={false} className={className}>
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <h2 className="font-display font-semibold text-ink">{title}</h2>
          {subtitle && <p className="text-xs text-ink-3 mt-0.5">{subtitle}</p>}
        </div>
        {actions}
      </div>
      {children}
    </Card>
  )
}

export default ChartCard
