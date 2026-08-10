import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  HiOutlinePaperAirplane, HiOutlineArrowUpTray,
  HiOutlineXMark, HiOutlineMap,
} from 'react-icons/hi2'
import {
  RadialBarChart, RadialBar, PolarAngleAxis,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from 'recharts'
import PageWrapper from '@/components/common/PageWrapper.jsx'
import PageHeader from '@/components/common/PageHeader.jsx'
import Card from '@/components/common/Card.jsx'
import Badge from '@/components/common/Badge.jsx'
import Button from '@/components/common/Button.jsx'
import { useChartTheme } from '@/hooks/useChartTheme.js'
import droneData from '@/data/droneAnalysis.json'
import { staggerContainer, fadeInUp } from '@/utils/motionVariants.js'
import { classNames } from '@/utils/formatters.js'

/* ── Health zone block ────────────────────────────────────────── */
function ZoneBlock({ label, pct, color }) {
  return (
    <div className={classNames('rounded-xl px-4 py-3 flex items-center justify-between', color)}>
      <span className="text-xs font-semibold">{label}</span>
      <span className="font-bold">{pct}%</span>
    </div>
  )
}

/* ── Farm map placeholder ──────────────────────────────────────── */
function FarmMapPlaceholder({ zones }) {
  const colors = { healthy: '#22c55e', moderate: '#f59e0b', stressed: '#ef4444', water: '#0ea5e9' }
  return (
    <div className="relative rounded-2xl overflow-hidden bg-surface-2 aspect-square sm:aspect-video max-h-64 flex items-center justify-center">
      {/* Simple SVG heatmap placeholder */}
      <svg viewBox="0 0 400 240" className="w-full h-full" aria-label="Farm health heatmap">
        {/* Field boundary */}
        <rect x="20" y="20" width="360" height="200" rx="12" fill="none" stroke="rgb(255 255 255 / 0.15)" strokeWidth="2" />
        {/* Zone patches */}
        <rect x="30"  y="30"  width="120" height="90"  rx="8" fill="#22c55e" opacity="0.45" />
        <rect x="160" y="30"  width="110" height="90"  rx="8" fill="#22c55e" opacity="0.35" />
        <rect x="280" y="30"  width="90"  height="90"  rx="8" fill="#f59e0b" opacity="0.5"  />
        <rect x="30"  y="130" width="100" height="80"  rx="8" fill="#f59e0b" opacity="0.4"  />
        <rect x="140" y="130" width="130" height="80"  rx="8" fill="#ef4444" opacity="0.45" />
        <rect x="280" y="130" width="90"  height="80"  rx="8" fill="#22c55e" opacity="0.3"  />
        {/* Labels */}
        <text x="90"  y="80"  textAnchor="middle" fill="white" fontSize="11" opacity="0.9">Healthy</text>
        <text x="215" y="80"  textAnchor="middle" fill="white" fontSize="11" opacity="0.9">Healthy</text>
        <text x="325" y="80"  textAnchor="middle" fill="white" fontSize="11" opacity="0.9">Moderate</text>
        <text x="80"  y="175" textAnchor="middle" fill="white" fontSize="11" opacity="0.9">Moderate</text>
        <text x="205" y="175" textAnchor="middle" fill="white" fontSize="11" opacity="0.9">Stress</text>
        <text x="325" y="175" textAnchor="middle" fill="white" fontSize="11" opacity="0.9">Healthy</text>
      </svg>
      {/* Legend */}
      <div className="absolute bottom-3 right-3 flex flex-col gap-1">
        {[['Healthy','bg-primary-500'],['Moderate','bg-accent-amber'],['Stress','bg-accent-rose']].map(([l,c]) => (
          <div key={l} className="flex items-center gap-1.5 text-[10px] text-white bg-black/40 rounded px-2 py-0.5">
            <span className={classNames('size-2 rounded-full', c)} />{l}
          </div>
        ))}
      </div>
    </div>
  )
}

function DroneMonitoring() {
  const { palette, axisProps, gridProps, animationProps, tooltipProps } = useChartTheme()
  const inputRef = useRef(null)
  const [preview, setPreview] = useState(null)
  const [dragging, setDragging] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const handle = (file) => {
    if (!file || !file.type.startsWith('image/')) return
    setPreview(URL.createObjectURL(file))
    setResult(null)
  }

  const handleAnalyse = async () => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 2000))
    setLoading(false)
    setResult(droneData)
  }

  const handleReset = () => { setPreview(null); setResult(null) }

  const analysis = result?.analysis ?? {
    overallHealth: result?.data?.[0]?.healthScore ?? 78,
    healthyArea: 100 - (result?.data?.[0]?.affectedAreaPercent ?? 18),
    stressArea: result?.data?.[0]?.affectedAreaPercent ?? 18,
    ndvi: result?.data?.[0]?.ndviAverage ?? 0.74,
    zones: [
      { label: 'Healthy',     percentage: 68 },
      { label: 'Moderate',    percentage: 14 },
      { label: 'Water Stress', percentage: 12 },
      { label: 'Diseased',    percentage: 6  },
    ],
    recommendations: result?.data?.[0]?.anomaliesDetected ?? [
      'Apply fungicide in Zone C (18% affected) within 48h.',
      'Increase irrigation in South Ridge — water stress detected.',
      'Schedule re-survey in 5 days to track recovery.',
    ],
  }
  const zones = analysis.zones ?? []

  const zoneBarData = zones.map((z) => ({ name: z.label, value: z.percentage }))
  const zoneColors = { Healthy: palette.series[0], Moderate: palette.series[3], 'Water Stress': palette.series[2], Diseased: palette.series[4] }

  return (
    <PageWrapper>
      <PageHeader
        icon={HiOutlinePaperAirplane}
        accent="sky"
        title="Drone Analytics"
        description="Upload aerial farm imagery for NDVI-based health mapping, stress detection, and field zone analysis."
        badge={{ label: 'Computer Vision', status: 'info' }}
      />

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* Upload panel */}
        <div className="xl:col-span-2 flex flex-col gap-5">
          <Card hover={false}>
            <h2 className="font-display font-semibold text-ink mb-4">Upload Drone Image</h2>
            {!preview ? (
              <div
                onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => { e.preventDefault(); setDragging(false); handle(e.dataTransfer.files[0]) }}
                onClick={() => inputRef.current?.click()}
                className={classNames(
                  'flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed',
                  'cursor-pointer py-12 px-4 text-center transition-all duration-300',
                  dragging ? 'border-accent-sky bg-accent-sky/10' : 'border-line-2 hover:border-accent-sky/50 hover:bg-accent-sky/5',
                )}
              >
                <span className="size-14 rounded-2xl bg-accent-sky/15 text-sky-300 flex items-center justify-center text-3xl">
                  <HiOutlinePaperAirplane />
                </span>
                <div>
                  <p className="font-semibold text-ink">Drop aerial image here</p>
                  <p className="text-sm text-ink-3 mt-1">JPG, PNG, TIF up to 50 MB</p>
                </div>
                <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handle(e.target.files[0])} />
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="relative rounded-xl overflow-hidden aspect-video bg-surface-2">
                  <img src={preview} alt="Drone preview" className="w-full h-full object-cover" />
                  <button onClick={handleReset} className="absolute top-2 right-2 size-7 rounded-full glass flex items-center justify-center text-ink-2 hover:text-ink cursor-pointer">
                    <HiOutlineXMark className="text-sm" />
                  </button>
                </div>
                <Button icon={HiOutlinePaperAirplane} loading={loading} onClick={handleAnalyse} className="w-full">
                  {loading ? 'Analysing…' : 'Analyse Field'}
                </Button>
                {loading && (
                  <div className="glass rounded-xl px-4 py-3 text-xs text-ink-2 flex items-center gap-2">
                    <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="size-4 rounded-full border-2 border-accent-sky border-t-transparent shrink-0" />
                    Processing NDVI bands and health zones…
                  </div>
                )}
              </div>
            )}
          </Card>

          {/* Latest drone flights */}
          <Card hover={false}>
            <h2 className="font-display font-semibold text-ink mb-3">Recent Flights</h2>
            <div className="flex flex-col gap-2">
              {(droneData?.data?.slice(0, 4) ?? []).map((f) => (
                <div key={f.id} className="glass rounded-xl px-4 py-3 flex items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-ink">{f.cropDetected ?? 'Unknown'}</p>
                    <p className="text-xs text-ink-3">{f.flightDate} · NDVI {f.ndviAverage}</p>
                  </div>
                  <Badge status={f.healthScore >= 85 ? 'optimal' : f.healthScore >= 70 ? 'warning' : 'critical'}>
                    Health {f.healthScore}%
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Results */}
        <div className="xl:col-span-3 flex flex-col gap-5">
          {result ? (
            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex flex-col gap-5">
              {/* Summary KPIs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'Farm Health',    value: `${analysis.overallHealth ?? 78}%`, status: 'optimal' },
                  { label: 'Healthy Area',   value: `${analysis.healthyArea ?? 68}%`,  status: 'optimal' },
                  { label: 'Stress Area',    value: `${analysis.stressArea ?? 18}%`,   status: 'warning' },
                  { label: 'NDVI Average',   value: analysis.ndvi ?? '0.74',            status: 'good'    },
                ].map((kpi) => (
                  <motion.div key={kpi.label} variants={fadeInUp} className="glass-card p-4 text-center">
                    <p className="text-xs text-ink-3">{kpi.label}</p>
                    <p className="font-display text-xl font-bold text-ink mt-1">{kpi.value}</p>
                    <Badge status={kpi.status} className="mt-2">{kpi.status}</Badge>
                  </motion.div>
                ))}
              </div>

              {/* Farm map */}
              <motion.div variants={fadeInUp} className="glass-card p-5">
                <h3 className="font-display font-semibold text-ink mb-3 flex items-center gap-2">
                  <HiOutlineMap className="text-accent-sky" /> Field Health Map
                </h3>
                <FarmMapPlaceholder zones={zones} />
              </motion.div>

              {/* Zone breakdown chart */}
              <motion.div variants={fadeInUp}>
                <Card hover={false}>
                  <h3 className="font-display font-semibold text-ink mb-4">Zone Distribution</h3>
                  <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={zoneBarData} layout="vertical">
                      <CartesianGrid {...gridProps} />
                      <XAxis type="number" {...axisProps} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                      <YAxis type="category" dataKey="name" {...axisProps} width={80} />
                      <Tooltip {...tooltipProps} formatter={(v) => [`${v}%`, 'Coverage']} />
                      <Bar dataKey="value" radius={[0,4,4,0]} {...animationProps}>
                        {zoneBarData.map((entry) => (
                          <Cell key={entry.name} fill={zoneColors[entry.name] ?? palette.series[1]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              </motion.div>

              {/* AI insights */}
              <motion.div variants={fadeInUp} className="glass-card p-5">
                <h3 className="font-semibold text-ink mb-3">AI Recommendations</h3>
                <div className="flex flex-col gap-2">
                  {(analysis.recommendations ?? [
                    'Apply fungicide in Zone C (18% affected) within 48h.',
                    'Increase irrigation in South Ridge — water stress detected.',
                    'Schedule re-survey in 5 days to track recovery.',
                  ]).map((rec, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-ink-2">
                      <span className="text-primary-400 mt-0.5 shrink-0">▸</span>{rec}
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <Card hover={false} className="flex items-center justify-center py-24">
              <div className="text-center">
                <HiOutlineMap className="text-4xl text-ink-3 mx-auto mb-3" />
                <p className="text-ink-3 text-sm">Upload a drone image to see the field health map and analysis.</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </PageWrapper>
  )
}

export default DroneMonitoring
