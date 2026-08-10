import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiOutlineBeaker, HiOutlineChartBar, HiOutlineLightBulb } from 'react-icons/hi2'
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from 'recharts'
import PageWrapper from '@/components/common/PageWrapper.jsx'
import PageHeader from '@/components/common/PageHeader.jsx'
import Card from '@/components/common/Card.jsx'
import Badge from '@/components/common/Badge.jsx'
import Button from '@/components/common/Button.jsx'
import Input from '@/components/common/Input.jsx'
import { useChartTheme } from '@/hooks/useChartTheme.js'
import soilData from '@/data/soilAnalysis.json'
import { staggerContainer, fadeInUp } from '@/utils/motionVariants.js'
import { classNames } from '@/utils/formatters.js'

/* ── Nutrient bar ─────────────────────────────────────────────── */
function NutrientBar({ label, value, optimal, unit = 'mg/kg' }) {
  const pct     = Math.min((value / (optimal * 1.5)) * 100, 100)
  const optPct  = Math.min((optimal / (optimal * 1.5)) * 100, 100)
  const status  = value >= optimal * 0.9 ? 'optimal' : value >= optimal * 0.6 ? 'warning' : 'critical'
  const colors  = { optimal: 'bg-primary-500', warning: 'bg-accent-amber', critical: 'bg-accent-rose' }

  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="font-semibold text-ink">{label}</span>
        <span className="text-ink-3">{value} / {optimal} {unit}</span>
      </div>
      <div className="relative h-2 rounded-full bg-surface-2 overflow-visible">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={classNames('h-full rounded-full', colors[status])}
        />
        {/* Optimal marker */}
        <span
          className="absolute top-1/2 -translate-y-1/2 w-0.5 h-4 bg-ink-3/50 rounded"
          style={{ left: `${optPct}%` }}
          title={`Optimal: ${optimal}`}
        />
      </div>
      <div className="flex justify-between mt-0.5">
        <Badge status={status} className="text-[10px] px-1.5 py-0.5">{status}</Badge>
      </div>
    </div>
  )
}

/* ── pH gauge (simple visual) ──────────────────────────────────── */
function PhGauge({ ph }) {
  const label = ph < 5.5 ? 'Strongly Acidic' : ph < 6.5 ? 'Slightly Acidic' : ph <= 7.5 ? 'Neutral (Ideal)' : ph <= 8.5 ? 'Alkaline' : 'Strongly Alkaline'
  const status = ph >= 6.0 && ph <= 7.5 ? 'optimal' : ph >= 5.5 && ph <= 8.0 ? 'warning' : 'critical'
  const pct = ((ph - 0) / 14) * 100

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between text-xs">
        <span className="text-ink-3">Acidic (0)</span>
        <span className="font-bold text-ink text-sm">pH {ph}</span>
        <span className="text-ink-3">Alkaline (14)</span>
      </div>
      <div className="h-4 rounded-full overflow-hidden"
        style={{ background: 'linear-gradient(to right, #ef4444, #f59e0b, #22c55e, #3b82f6, #7c3aed)' }}>
        <div className="relative h-full">
          <motion.span
            initial={{ left: '0%' }}
            whileInView={{ left: `${pct}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 size-5 rounded-full bg-white border-2 border-ink/20 shadow-md"
          />
        </div>
      </div>
      <Badge status={status} className="self-start">{label}</Badge>
    </div>
  )
}

function SoilAnalysis() {
  const { palette, axisProps, gridProps, animationProps, tooltipProps } = useChartTheme()
  const [form, setForm] = useState({
    nitrogen: '', phosphorus: '', potassium: '',
    ph: '', moisture: '', organicCarbon: '',
  })
  const [result, setResult] = useState(soilData?.samples?.[0] ?? null)

  const handleChange = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }))

  const handleAnalyse = () => {
    // For demo we use the first sample from the JSON data
    setResult(soilData?.samples?.[0] ?? null)
  }

  const nutrients = result ? [
    { label: 'Nitrogen (N)',    value: result.npk?.n ?? 42,  optimal: 55 },
    { label: 'Phosphorus (P)',  value: result.npk?.p ?? 38,  optimal: 40 },
    { label: 'Potassium (K)',   value: result.npk?.k ?? 61,  optimal: 50 },
    { label: 'Organic Carbon',  value: result.organicCarbon ?? 1.8, optimal: 2.5, unit: '%' },
  ] : []

  const radarData = result ? [
    { metric: 'N', value: Math.min(((result.npk?.n ?? 42) / 55) * 100, 100) },
    { metric: 'P', value: Math.min(((result.npk?.p ?? 38) / 40) * 100, 100) },
    { metric: 'K', value: Math.min(((result.npk?.k ?? 61) / 50) * 100, 100) },
    { metric: 'pH', value: Math.min((Math.abs((result.ph ?? 6.5) - 7) < 1 ? 90 : 60), 100) },
    { metric: 'Moisture', value: Math.min((result.moisture ?? 45) / 80 * 100, 100) },
    { metric: 'OC', value: Math.min(((result.organicCarbon ?? 1.8) / 2.5) * 100, 100) },
  ] : []

  return (
    <PageWrapper>
      <PageHeader
        icon={HiOutlineBeaker}
        accent="amber"
        title="Soil Analysis"
        description="Enter soil parameters or upload lab report data to get nutrient profiles, pH assessment, and crop recommendations."
        badge={{ label: 'Lab Grade', status: 'info' }}
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input form */}
        <Card hover={false} className="xl:col-span-1 h-fit">
          <h2 className="font-display font-semibold text-ink mb-4">Soil Parameters</h2>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <Input label="Nitrogen (N)"   placeholder="mg/kg" value={form.nitrogen}      onChange={handleChange('nitrogen')} />
              <Input label="Phosphorus (P)" placeholder="mg/kg" value={form.phosphorus}    onChange={handleChange('phosphorus')} />
              <Input label="Potassium (K)"  placeholder="mg/kg" value={form.potassium}     onChange={handleChange('potassium')} />
              <Input label="pH Level"       placeholder="0–14"  value={form.ph}            onChange={handleChange('ph')} />
              <Input label="Moisture"       placeholder="%"     value={form.moisture}      onChange={handleChange('moisture')} />
              <Input label="Organic Carbon" placeholder="%"     value={form.organicCarbon} onChange={handleChange('organicCarbon')} />
            </div>
            <Button icon={HiOutlineBeaker} onClick={handleAnalyse} className="w-full mt-1">
              Analyse Soil
            </Button>
          </div>
        </Card>

        {/* Results */}
        <div className="xl:col-span-2 flex flex-col gap-5">
          {result ? (
            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex flex-col gap-5">
              {/* Score + pH */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <motion.div variants={fadeInUp} className="glass-card p-5">
                  <p className="text-xs text-ink-3 mb-1">Soil Health Score</p>
                  <div className="flex items-end gap-2">
                    <span className="font-display text-4xl font-bold text-primary-400">{result.healthScore ?? 74}</span>
                    <span className="text-ink-3 mb-1">/ 100</span>
                  </div>
                  <Badge status={result.healthScore >= 80 ? 'optimal' : result.healthScore >= 60 ? 'warning' : 'critical'} className="mt-2">
                    {result.healthLabel ?? 'Good'}
                  </Badge>
                </motion.div>
                <motion.div variants={fadeInUp} className="glass-card p-5">
                  <p className="text-xs text-ink-3 mb-3">pH Level</p>
                  <PhGauge ph={result.ph ?? 6.5} />
                </motion.div>
              </div>

              {/* Nutrients */}
              <motion.div variants={fadeInUp} className="glass-card p-5">
                <h3 className="font-semibold text-ink mb-4 flex items-center gap-2">
                  <HiOutlineChartBar className="text-accent-amber" /> Nutrient Levels
                </h3>
                <div className="flex flex-col gap-4">
                  {nutrients.map((n) => <NutrientBar key={n.label} {...n} />)}
                </div>
              </motion.div>

              {/* Radar + suitable crops */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <motion.div variants={fadeInUp} className="glass-card p-5">
                  <h3 className="font-semibold text-ink mb-2">Nutrient Radar</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <RadarChart data={radarData}>
                      <PolarGrid stroke={palette.grid} />
                      <PolarAngleAxis dataKey="metric" tick={{ fill: palette.tickFill, fontSize: 11 }} />
                      <Radar dataKey="value" stroke={palette.series[0]} fill={palette.series[0]} fillOpacity={0.25} {...animationProps} />
                    </RadarChart>
                  </ResponsiveContainer>
                </motion.div>

                <motion.div variants={fadeInUp} className="glass-card p-5">
                  <h3 className="font-semibold text-ink mb-3 flex items-center gap-2">
                    <HiOutlineLightBulb className="text-primary-400" /> Suitable Crops
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(result.suitableCrops ?? ['Wheat','Maize','Soybean','Rice']).map((c) => (
                      <span key={c} className="glass px-3 py-1.5 rounded-lg text-xs font-medium text-ink">{c}</span>
                    ))}
                  </div>
                  <h3 className="font-semibold text-ink mb-2 text-sm">Improvement Tips</h3>
                  <ul className="flex flex-col gap-1.5">
                    {(result.improvements ?? [
                      'Apply 20 kg/ha extra nitrogen before next season',
                      'Add organic matter to improve structure',
                      'Lime application to raise pH to 6.8',
                    ]).map((tip, i) => (
                      <li key={i} className="text-xs text-ink-2 flex gap-2">
                        <span className="text-primary-400 shrink-0">▸</span>{tip}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <Card hover={false} className="flex items-center justify-center py-20">
              <p className="text-ink-3 text-sm">Enter soil parameters and click Analyse Soil to see results.</p>
            </Card>
          )}
        </div>
      </div>
    </PageWrapper>
  )
}

export default SoilAnalysis
