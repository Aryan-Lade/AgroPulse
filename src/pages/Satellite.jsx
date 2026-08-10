import { motion } from 'framer-motion'
import {
  HiOutlineGlobeAmericas,
  HiOutlineArrowTrendingUp, HiOutlineArrowTrendingDown,
} from 'react-icons/hi2'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'
import PageWrapper from '@/components/common/PageWrapper.jsx'
import PageHeader from '@/components/common/PageHeader.jsx'
import Card from '@/components/common/Card.jsx'
import Badge from '@/components/common/Badge.jsx'
import { useChartTheme } from '@/hooks/useChartTheme.js'
import satData from '@/data/satellite.json'
import { staggerContainer, fadeInUp } from '@/utils/motionVariants.js'
import { classNames } from '@/utils/formatters.js'

/* ── Index KPI tile ──────────────────────────────────────────── */
function IndexTile({ label, value, delta, status }) {
  const positive = delta >= 0
  return (
    <motion.div variants={fadeInUp} className="glass-card p-5">
      <p className="text-xs text-ink-3 mb-1">{label}</p>
      <p className="font-display text-3xl font-bold text-ink">{value}</p>
      <div className="flex items-center gap-1.5 mt-2">
        {positive
          ? <HiOutlineArrowTrendingUp className="text-primary-400 text-sm" />
          : <HiOutlineArrowTrendingDown className="text-accent-rose text-sm" />}
        <span className={classNames('text-xs font-semibold', positive ? 'text-primary-400' : 'text-accent-rose')}>
          {positive ? '+' : ''}{delta} vs last week
        </span>
      </div>
      <Badge status={status} className="mt-2">{status}</Badge>
    </motion.div>
  )
}

/* ── Satellite image placeholder (SVG heatmap) ───────────────── */
function SatImage({ title, colorScheme }) {
  const palettes = {
    ndvi:     ['#052e16','#14532d','#166534','#15803d','#16a34a','#22c55e','#4ade80'],
    moisture: ['#1e3a5f','#1d4ed8','#2563eb','#3b82f6','#60a5fa','#93c5fd','#bfdbfe'],
    stress:   ['#450a0a','#7f1d1d','#991b1b','#dc2626','#ef4444','#f87171','#fca5a5'],
  }
  const cols = palettes[colorScheme] ?? palettes.ndvi
  const bg   = { ndvi: '#0b120e', moisture: '#0c1a2e', stress: '#1c0a0a' }[colorScheme] ?? '#0b120e'

  return (
    <div className="rounded-xl overflow-hidden aspect-video" style={{ background: bg }}>
      <svg viewBox="0 0 400 225" className="w-full h-full" aria-label={`${title} satellite view`}>
        {Array.from({ length: 5 }).map((_, row) =>
          Array.from({ length: 8 }).map((_, col) => (
            <rect
              key={`${row}-${col}`}
              x={col * 50 + 1} y={row * 45 + 1} width={48} height={43}
              fill={cols[(row * 3 + col * 2) % cols.length]}
              opacity={0.65 + ((row + col) % 3) * 0.1}
              rx={3}
            />
          ))
        )}
        {/* Farm boundary */}
        <rect x="40" y="30" width="320" height="165" fill="none"
          stroke="rgba(255,255,255,0.35)" strokeWidth="2" strokeDasharray="8 4" rx="8" />
        <text x="200" y="18" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10">
          Greenfield Farm · {satData.satellite} · 10 m resolution
        </text>
      </svg>
    </div>
  )
}

function Satellite() {
  const { palette, axisProps, gridProps, animationProps, tooltipProps } = useChartTheme()

  const { indices, fieldHealth, historicalNdvi, alerts } = satData

  return (
    <PageWrapper>
      <PageHeader
        icon={HiOutlineGlobeAmericas}
        accent="sky"
        title="Satellite Monitoring"
        description={`Track vegetation health, moisture, and crop stress from ${satData.satellite} imagery. Resolution: ${satData.resolution}.`}
        badge={{ label: 'Live Feed', status: 'info' }}
      />

      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex flex-col gap-6">

        {/* Index strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <IndexTile label={indices.ndvi.label} value={indices.ndvi.value} delta={indices.ndvi.delta} status={indices.ndvi.status} />
          <IndexTile label={indices.ndwi.label} value={indices.ndwi.value} delta={indices.ndwi.delta} status={indices.ndwi.status} />
          <IndexTile label={indices.evi.label}  value={indices.evi.value}  delta={indices.evi.delta}  status={indices.evi.status}  />
          <IndexTile label={indices.savi.label} value={indices.savi.value} delta={indices.savi.delta} status={indices.savi.status} />
        </div>

        {/* Satellite image trio */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'NDVI — Vegetation Health', colorScheme: 'ndvi'     },
            { title: 'NDWI — Water Content',     colorScheme: 'moisture' },
            { title: 'Stress Index',              colorScheme: 'stress'   },
          ].map((img) => (
            <motion.div key={img.title} variants={fadeInUp} className="glass-card p-4">
              <p className="text-xs font-semibold text-ink-2 mb-3">{img.title}</p>
              <SatImage {...img} />
              <div className="flex flex-wrap gap-1.5 mt-3">
                {img.colorScheme === 'ndvi'     && ['Low','Medium','High','Very High'].map((l) => <span key={l} className="text-[10px] text-ink-3 glass px-1.5 py-0.5 rounded">{l}</span>)}
                {img.colorScheme === 'moisture' && ['Dry','Moist','Wet','Saturated'].map((l)   => <span key={l} className="text-[10px] text-ink-3 glass px-1.5 py-0.5 rounded">{l}</span>)}
                {img.colorScheme === 'stress'   && ['None','Mild','Moderate','Severe'].map((l) => <span key={l} className="text-[10px] text-ink-3 glass px-1.5 py-0.5 rounded">{l}</span>)}
              </div>
            </motion.div>
          ))}
        </div>

        {/* NDVI trend + field table */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <motion.div variants={fadeInUp}>
            <Card hover={false}>
              <h3 className="font-display font-semibold text-ink mb-4">NDVI Trend (6 months)</h3>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={historicalNdvi}>
                  <defs>
                    <linearGradient id="ndviGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={palette.series[0]} stopOpacity={0.35} />
                      <stop offset="100%" stopColor={palette.series[0]} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid {...gridProps} />
                  <XAxis dataKey="date" {...axisProps} />
                  <YAxis {...axisProps} domain={[0.3, 1]} />
                  <Tooltip {...tooltipProps} />
                  <Area dataKey="ndvi" name="NDVI" stroke={palette.series[0]} fill="url(#ndviGrad)" strokeWidth={2} {...animationProps} />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card hover={false}>
              <h3 className="font-display font-semibold text-ink mb-3">Field Health by Zone</h3>
              <div className="flex flex-col gap-2">
                {fieldHealth.map((f) => (
                  <div key={f.id} className="glass rounded-xl px-4 py-3 flex items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-ink">{f.name}</p>
                      <p className="text-xs text-ink-3">{f.crop} · {f.area} ha</p>
                    </div>
                    <div className="hidden sm:block w-24">
                      <div className="h-1.5 rounded-full bg-surface-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${f.coverage}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8 }}
                          className={classNames('h-full rounded-full',
                            f.stress === 'low' ? 'bg-primary-500' : f.stress === 'moderate' ? 'bg-accent-amber' : 'bg-accent-rose',
                          )}
                        />
                      </div>
                    </div>
                    <Badge status={f.stress === 'low' ? 'optimal' : f.stress === 'moderate' ? 'warning' : 'critical'}>
                      NDVI {f.ndvi}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Alerts */}
        {alerts.length > 0 && (
          <motion.div variants={fadeInUp} className="glass-card p-5">
            <h3 className="font-semibold text-ink mb-3">Satellite Alerts</h3>
            <div className="flex flex-col gap-3">
              {alerts.map((a) => (
                <div key={a.id} className={classNames(
                  'flex items-start gap-3 rounded-xl px-4 py-3 border-l-4',
                  a.severity === 'warning'
                    ? 'border-l-accent-amber bg-accent-amber/5'
                    : 'border-l-accent-sky bg-accent-sky/5',
                )}>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-semibold text-ink">{a.field}</p>
                      <Badge status={a.severity}>{a.type}</Badge>
                    </div>
                    <p className="text-xs text-ink-2">{a.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

      </motion.div>
    </PageWrapper>
  )
}

export default Satellite
