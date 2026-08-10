import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiOutlineChartBar, HiOutlineSparkles, HiOutlineCurrencyRupee } from 'react-icons/hi2'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts'
import PageWrapper from '@/components/common/PageWrapper.jsx'
import PageHeader from '@/components/common/PageHeader.jsx'
import Card from '@/components/common/Card.jsx'
import Badge from '@/components/common/Badge.jsx'
import Button from '@/components/common/Button.jsx'
import Input from '@/components/common/Input.jsx'
import Select from '@/components/common/Select.jsx'
import { useChartTheme } from '@/hooks/useChartTheme.js'
import yieldData from '@/data/yieldPrediction.json'
import { staggerContainer, fadeInUp } from '@/utils/motionVariants.js'
import { classNames } from '@/utils/formatters.js'

const CROPS = ['Rice','Wheat','Cotton','Maize','Soybean','Tomato','Potato','Sugarcane']
const SOIL_TYPES = ['Sandy','Loamy','Clay','Sandy Loam','Clay Loam']
const SEASONS = ['Kharif (Jun–Oct)','Rabi (Nov–Mar)','Zaid (Mar–Jun)']

/* ── KPI result card ─────────────────────────────────────────── */
function KpiCard({ label, value, sub, color = 'text-primary-400', icon: Icon }) {
  return (
    <motion.div variants={fadeInUp} className="glass-card p-5">
      <div className="flex items-center gap-2 mb-2">
        {Icon && <Icon className={classNames('text-xl', color)} />}
        <p className="text-xs text-ink-3">{label}</p>
      </div>
      <p className={classNames('font-display text-2xl font-bold', color)}>{value}</p>
      {sub && <p className="text-xs text-ink-3 mt-0.5">{sub}</p>}
    </motion.div>
  )
}

function YieldPrediction() {
  const { palette, axisProps, gridProps, animationProps, tooltipProps } = useChartTheme()
  const [form, setForm] = useState({
    crop: '', area: '', soilType: '', rainfall: '',
    temperature: '', irrigation: 'Drip', season: '',
  })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: typeof e === 'string' ? e : e.target.value }))

  const handlePredict = async () => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1800))
    setLoading(false)
    setResult(yieldData)
  }

  const historical = yieldData?.historical ?? [
    { year: '2022', yield: 3.8, revenue: 190000 },
    { year: '2023', yield: 4.2, revenue: 218000 },
    { year: '2024', yield: 4.6, revenue: 241000 },
    { year: '2025', yield: 4.9, revenue: 264000 },
    { year: '2026 (P)', yield: 5.4, revenue: 297000 },
  ]

  /* Map first yield record from JSON to prediction shape */
  const firstYield = yieldData?.data?.[0]

  return (
    <PageWrapper>
      <PageHeader
        icon={HiOutlineChartBar}
        accent="primary"
        title="Yield Prediction"
        description="Predict expected harvest, revenue, and profitability based on crop inputs, weather, and historical farm data."
        badge={{ label: 'AI Model', status: 'info' }}
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Form */}
        <Card hover={false} className="xl:col-span-1 h-fit">
          <h2 className="font-display font-semibold text-ink mb-4">Crop Parameters</h2>
          <div className="flex flex-col gap-4">
            <Select label="Crop" options={CROPS} placeholder="Select crop" value={form.crop} onChange={set('crop')} />
            <div className="grid grid-cols-2 gap-3">
              <Input label="Area (ha)" placeholder="e.g. 5" type="number" value={form.area} onChange={set('area')} />
              <Select label="Soil Type" options={SOIL_TYPES} placeholder="Select" value={form.soilType} onChange={set('soilType')} />
              <Input label="Avg Rainfall" placeholder="mm" type="number" value={form.rainfall} onChange={set('rainfall')} />
              <Input label="Avg Temp (°C)" placeholder="°C" type="number" value={form.temperature} onChange={set('temperature')} />
            </div>
            <Select label="Growing Season" options={SEASONS} placeholder="Select season" value={form.season} onChange={set('season')} />
            <Button icon={HiOutlineSparkles} loading={loading} onClick={handlePredict} className="w-full mt-1">
              {loading ? 'Predicting…' : 'Predict Yield'}
            </Button>
          </div>
        </Card>

        {/* Results */}
        <div className="xl:col-span-2 flex flex-col gap-5">
          {result ? (
            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex flex-col gap-5">
              {/* KPI strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <KpiCard label="Expected Yield"    value={`${firstYield?.expectedYieldTonnes ?? 5.4} t`}    sub="total production"           icon={HiOutlineChartBar}       color="text-primary-400" />
                <KpiCard label="Area Sown"          value={`${firstYield?.areaSown ?? 5} ha`}                sub="field area"                  icon={HiOutlineChartBar}       color="text-accent-sky"  />
                <KpiCard label="Est. Revenue"        value={`₹${((firstYield?.expectedRevenueINR ?? 297000)/100000).toFixed(1)}L`} sub="at current prices" icon={HiOutlineCurrencyRupee} color="text-primary-400" />
                <KpiCard label="Confidence"          value={`${firstYield?.confidencePercent ?? 88}%`}       sub="model confidence"           icon={HiOutlineSparkles}       color="text-accent-amber"/>
              </div>

              {/* Harvest info */}
              <motion.div variants={fadeInUp} className="glass-card p-5 flex flex-wrap gap-4 items-center justify-between">
                <div>
                  <p className="text-xs text-ink-3">Estimated Harvest Date</p>
                  <p className="font-semibold text-ink mt-0.5">{firstYield?.harvestDate ?? 'November 18, 2026'}</p>
                </div>
                <div>
                  <p className="text-xs text-ink-3">Cost of Production</p>
                  <p className="font-semibold text-ink mt-0.5">₹{((firstYield?.costINR ?? 124000)/100000).toFixed(1)}L</p>
                </div>
                <div>
                  <p className="text-xs text-ink-3">Estimated Profit</p>
                  <p className="font-semibold text-primary-400 mt-0.5">₹{((firstYield?.expectedProfitINR ?? 173000)/100000).toFixed(1)}L</p>
                </div>
                <Badge status="optimal">Favorable Conditions</Badge>
              </motion.div>

              {/* Yield trend chart */}
              <motion.div variants={fadeInUp}>
                <Card hover={false}>
                  <h3 className="font-display font-semibold text-ink mb-4">Historical + Predicted Yield (t/ha)</h3>
                  <ResponsiveContainer width="100%" height={220}>
                    <AreaChart data={historical}>
                      <defs>
                        <linearGradient id="yieldGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={palette.series[0]} stopOpacity={0.3} />
                          <stop offset="100%" stopColor={palette.series[0]} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid {...gridProps} />
                      <XAxis dataKey="year" {...axisProps} />
                      <YAxis {...axisProps} />
                      <Tooltip {...tooltipProps} />
                      <Area dataKey="yield" name="Yield (t/ha)" stroke={palette.series[0]} fill="url(#yieldGrad)" strokeWidth={2} {...animationProps} />
                    </AreaChart>
                  </ResponsiveContainer>
                </Card>
              </motion.div>

              {/* Revenue bar */}
              <motion.div variants={fadeInUp}>
                <Card hover={false}>
                  <h3 className="font-display font-semibold text-ink mb-4">Revenue Trend (₹)</h3>
                  <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={historical}>
                      <CartesianGrid {...gridProps} />
                      <XAxis dataKey="year" {...axisProps} />
                      <YAxis {...axisProps} tickFormatter={(v) => `₹${(v/1000).toFixed(0)}k`} />
                      <Tooltip {...tooltipProps} formatter={(v) => [`₹${v.toLocaleString('en-IN')}`, 'Revenue']} />
                      <Bar dataKey="revenue" fill={palette.series[1]} radius={[4,4,0,0]} {...animationProps} />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              </motion.div>
            </motion.div>
          ) : (
            <Card hover={false} className="flex items-center justify-center py-20">
              <p className="text-ink-3 text-sm">Fill in the crop parameters and click Predict Yield.</p>
            </Card>
          )}
        </div>
      </div>
    </PageWrapper>
  )
}

export default YieldPrediction
