import Card from '../common/Card.jsx'
import Badge from '../common/Badge.jsx'
import { recentReports } from '../../data/dashboardData.js'
import { formatDate } from '../../utils/formatters.js'

function ReportsTable() {
  return (
    <Card hover={false}>
      <h2 className="font-display font-semibold text-ink mb-1">Recent Reports</h2>
      <p className="text-xs text-ink-3 mb-4">Latest AI-generated analyses</p>
      <div className="overflow-x-auto -mx-5 sm:-mx-6 px-5 sm:px-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-widest text-ink-3 border-b border-line">
              <th className="pb-2.5 font-semibold">Report</th>
              <th className="pb-2.5 font-semibold">Date</th>
              <th className="pb-2.5 font-semibold">Crop</th>
              <th className="pb-2.5 font-semibold">Prediction</th>
              <th className="pb-2.5 font-semibold">Status</th>
              <th className="pb-2.5 font-semibold text-right">Accuracy</th>
            </tr>
          </thead>
          <tbody>
            {recentReports.map((report) => (
              <tr
                key={report.id}
                className="border-b border-line last:border-0 hover:bg-surface transition-colors"
              >
                <td className="py-3 font-medium text-ink whitespace-nowrap">{report.id}</td>
                <td className="py-3 text-ink-2 whitespace-nowrap">{formatDate(report.date)}</td>
                <td className="py-3 text-ink-2">{report.crop}</td>
                <td className="py-3 text-ink-2 whitespace-nowrap">{report.prediction}</td>
                <td className="py-3">
                  <Badge status={report.status}>{report.status}</Badge>
                </td>
                <td className="py-3 text-right font-semibold text-ink tabular-nums">
                  {report.accuracy}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

export default ReportsTable
