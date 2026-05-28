import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HiOutlineDocumentChartBar, HiOutlineArrowDownTray,
  HiOutlineEye, HiOutlineTrash, HiOutlineMagnifyingGlass,
  HiOutlineFunnel, HiOutlineXMark, HiOutlineCheckCircle,
} from 'react-icons/hi2'
import PageWrapper from '@/components/common/PageWrapper.jsx'
import PageHeader from '@/components/common/PageHeader.jsx'
import Card from '@/components/common/Card.jsx'
import Badge from '@/components/common/Badge.jsx'
import Button from '@/components/common/Button.jsx'
import EmptyState from '@/components/common/EmptyState.jsx'
import { useToast } from '@/context/ToastContext.jsx'
import reportsJson from '@/data/reports.json'
import { staggerContainer, fadeInUp } from '@/utils/motionVariants.js'
import { classNames, formatDate } from '@/utils/formatters.js'

const TYPE_COLORS = {
  monthly:   'bg-primary-500/15 text-primary-300 border-primary-500/30',
  disease:   'bg-accent-rose/15 text-rose-300 border-accent-rose/30',
  soil:      'bg-accent-amber/15 text-amber-300 border-accent-amber/30',
  yield:     'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  drone:     'bg-accent-sky/15 text-sky-300 border-accent-sky/30',
  weekly:    'bg-violet-500/15 text-violet-300 border-violet-500/30',
  seasonal:  'bg-earth-400/20 text-earth-300 border-earth-400/30',
  annual:    'bg-primary-700/20 text-primary-200 border-primary-700/30',
  pest:      'bg-accent-rose/10 text-rose-400 border-accent-rose/20',
  market:    'bg-accent-sky/10 text-sky-400 border-accent-sky/20',
  harvest:   'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  insurance: 'bg-accent-amber/10 text-amber-400 border-accent-amber/20',
  planning:  'bg-violet-500/10 text-violet-400 border-violet-500/20',
}

function TypeBadge({ type }) {
  return (
    <span className={classNames(
      'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border capitalize',
      TYPE_COLORS[type] ?? 'bg-surface-2 text-ink-2 border-line',
    )}>
      {type}
    </span>
  )
}

function Reports() {
  const toast = useToast()
  const [search, setSearch]   = useState('')
  const [filter, setFilter]   = useState('all')
  const [deleted, setDeleted] = useState(new Set())
  const [selectedReport, setSelectedReport] = useState(null)

  const allReports = reportsJson?.data ?? []
  const types = ['all', ...new Set(allReports.map((r) => r.reportType))]

  const visible = allReports.filter((r) => {
    if (deleted.has(r.id)) return false
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) ||
                        (r.crop ?? '').toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || r.reportType === filter
    return matchSearch && matchFilter
  })

  const handleDownload = (r) => {
    toast.success('Download started', `${r.name} is being prepared.`)
  }
  const handleDelete = (r) => {
    setDeleted((prev) => new Set([...prev, r.id]))
    toast.info('Report removed', `${r.name} was deleted.`)
  }

  return (
    <PageWrapper>
      <PageHeader
        icon={HiOutlineDocumentChartBar}
        accent="violet"
        title="Reports"
        description="View, download, and manage all your farm analysis reports."
        badge={{ label: `${allReports.length} Reports`, status: 'info' }}
        action={
          <Button icon={HiOutlineDocumentChartBar} size="sm"
            onClick={() => toast.success('Report queued', 'Your new report will be ready shortly.')}>
            Generate Report
          </Button>
        }
      />

      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex flex-col gap-5">
        {/* Search + type filters */}
        <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-2 glass rounded-xl px-3.5 py-2 flex-1 min-w-48 max-w-sm">
            <HiOutlineMagnifyingGlass className="text-ink-3 shrink-0" />
            <input
              type="text"
              placeholder="Search by name or crop…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-sm text-ink placeholder:text-ink-3 outline-none w-full"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <HiOutlineFunnel className="text-ink-3 text-sm shrink-0" />
            {types.slice(0, 7).map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={classNames(
                  'px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer capitalize',
                  filter === t
                    ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30'
                    : 'glass text-ink-2 hover:text-ink',
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </motion.div>

        {}
        {visible.length === 0 ? (
          <EmptyState
            icon={HiOutlineDocumentChartBar}
            title="No reports found"
            description="Try adjusting your search or filter, or generate a new report."
          />
        ) : (
          <>
            {}
            <motion.div variants={fadeInUp} className="glass-card overflow-hidden p-0 hidden md:block">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-line text-left">
                      {['Report','Type','Crop','Date','Size','Status','Actions'].map((h) => (
                        <th key={h} className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-ink-3">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {visible.map((r, i) => (
                      <motion.tr
                        key={r.id}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.03 }}
                        className="border-b border-line last:border-0 hover:bg-surface-2/40 transition-colors"
                      >
                        <td className="px-5 py-3.5 max-w-xs">
                          <p className="font-medium text-ink truncate">{r.name}</p>
                          <p className="text-xs text-ink-3 mt-0.5">{r.id} · {r.period}</p>
                        </td>
                        <td className="px-5 py-3.5"><TypeBadge type={r.reportType} /></td>
                        <td className="px-5 py-3.5 text-ink-2">{r.crop ?? '—'}</td>
                        <td className="px-5 py-3.5 text-ink-3 text-xs whitespace-nowrap">
                          {formatDate(r.generatedDate, { month: 'short', day: 'numeric', year: 'numeric' })}
                        </td>
                        <td className="px-5 py-3.5 text-ink-3 text-xs whitespace-nowrap">
                          {r.sizeKB > 0 ? `${(r.sizeKB / 1024).toFixed(1)} MB` : '—'}
                        </td>
                        <td className="px-5 py-3.5">
                          <Badge status={r.status === 'ready' ? 'optimal' : 'info'}>{r.status}</Badge>
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => setSelectedReport(r)}
                              className="size-8 rounded-lg glass flex items-center justify-center text-ink-2 hover:text-ink cursor-pointer transition-colors"
                              title="View Preview"
                            >
                              <HiOutlineEye className="text-sm" />
                            </button>
                            <button
                              onClick={() => handleDownload(r)}
                              disabled={r.status !== 'ready'}
                              className="size-8 rounded-lg glass flex items-center justify-center text-ink-2 hover:text-primary-400 cursor-pointer transition-colors disabled:opacity-40"
                              title="Download"
                            >
                              <HiOutlineArrowDownTray className="text-sm" />
                            </button>
                            <button
                              onClick={() => handleDelete(r)}
                              className="size-8 rounded-lg glass flex items-center justify-center text-ink-2 hover:text-accent-rose cursor-pointer transition-colors"
                              title="Delete"
                            >
                              <HiOutlineTrash className="text-sm" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {}
            <motion.div variants={fadeInUp} className="md:hidden flex flex-col gap-3">
              {visible.map((r) => (
                <div key={r.id} className="glass-card p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-ink text-sm truncate">{r.name}</p>
                      <p className="text-xs text-ink-3">{r.id} · {r.period}</p>
                    </div>
                    <Badge status={r.status === 'ready' ? 'optimal' : 'info'}>{r.status}</Badge>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <TypeBadge type={r.reportType} />
                    {r.crop && <span className="text-xs text-ink-3">{r.crop}</span>}
                    <div className="ml-auto flex gap-2">
                      <button
                        onClick={() => setSelectedReport(r)}
                        className="size-8 rounded-lg glass flex items-center justify-center text-ink-2 cursor-pointer"
                        title="View Preview"
                      >
                        <HiOutlineEye className="text-sm" />
                      </button>
                      <button onClick={() => handleDownload(r)} disabled={r.status !== 'ready'} className="size-8 rounded-lg glass flex items-center justify-center text-ink-2 hover:text-primary-400 cursor-pointer disabled:opacity-40">
                        <HiOutlineArrowDownTray className="text-sm" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </>
        )}
      </motion.div>

      {/* Report Preview Modal */}
      <AnimatePresence>
        {selectedReport && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-night-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              className="w-full max-w-xl glass-card rounded-2xl p-6 border border-line shadow-2xl flex flex-col gap-5 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between border-b border-line pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <TypeBadge type={selectedReport.reportType} />
                    <Badge status={selectedReport.status === 'ready' ? 'optimal' : 'info'}>
                      {selectedReport.status}
                    </Badge>
                  </div>
                  <h3 className="font-display font-bold text-ink text-lg">{selectedReport.name}</h3>
                  <p className="text-xs text-ink-3 mt-0.5">
                    Reference ID: {selectedReport.id} · Coverage: {selectedReport.period}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedReport(null)}
                  className="size-8 rounded-full glass flex items-center justify-center text-ink-3 hover:text-ink cursor-pointer shrink-0"
                >
                  <HiOutlineXMark />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="glass rounded-xl p-3 text-center">
                  <p className="text-[11px] text-ink-3">Target Crop</p>
                  <p className="font-bold text-ink text-sm mt-0.5">{selectedReport.crop || 'All Farm'}</p>
                </div>
                <div className="glass rounded-xl p-3 text-center">
                  <p className="text-[11px] text-ink-3">Generated</p>
                  <p className="font-bold text-ink text-sm mt-0.5">
                    {formatDate(selectedReport.generatedDate, { month: 'short', day: 'numeric' })}
                  </p>
                </div>
                <div className="glass rounded-xl p-3 text-center">
                  <p className="text-[11px] text-ink-3">File Size</p>
                  <p className="font-bold text-ink text-sm mt-0.5">
                    {selectedReport.sizeKB > 0 ? `${(selectedReport.sizeKB / 1024).toFixed(1)} MB` : '1.4 MB'}
                  </p>
                </div>
                <div className="glass rounded-xl p-3 text-center">
                  <p className="text-[11px] text-ink-3">Format</p>
                  <p className="font-bold text-primary-400 text-sm mt-0.5">PDF + CSV</p>
                </div>
              </div>

              <div className="glass rounded-xl p-4 flex flex-col gap-2">
                <h4 className="text-xs font-semibold text-ink flex items-center gap-1.5 uppercase tracking-wide">
                  <HiOutlineCheckCircle className="text-primary-400 text-base" /> Executive Summary & Findings
                </h4>
                <p className="text-xs text-ink-2 leading-relaxed">
                  Field health telemetry and spectral NDVI imagery show average canopy vitality at 84%.
                  Nitrogen uptake was balanced with optimal soil moisture retained across active zones.
                  Pest ingress remained below the economic threshold of 5%.
                </p>
              </div>

              <div className="glass rounded-xl p-4 flex flex-col gap-2">
                <h4 className="text-xs font-semibold text-ink uppercase tracking-wide">Action Items</h4>
                <ul className="text-xs text-ink-2 space-y-1.5 list-disc pl-4">
                  <li>Proceed with scheduled micronutrient foliar application in North Block.</li>
                  <li>Schedule secondary drone multi-spectral survey in 14 days.</li>
                  <li>Maintain current drip irrigation cycle at 45 min/zone.</li>
                </ul>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-line">
                <span className="text-xs text-ink-3">Certified by AgroPulse Precision AI</span>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => setSelectedReport(null)}>
                    Close
                  </Button>
                  <Button
                    icon={HiOutlineArrowDownTray}
                    size="sm"
                    onClick={() => {
                      handleDownload(selectedReport)
                      setSelectedReport(null)
                    }}
                  >
                    Download PDF
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PageWrapper>
  )
}

export default Reports
