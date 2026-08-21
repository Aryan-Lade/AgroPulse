import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  HiOutlineBeaker, HiOutlineSparkles, HiOutlineExclamationTriangle,
  HiOutlineCurrencyRupee, HiOutlineGlobeAlt,
} from 'react-icons/hi2'
import PageWrapper from '@/components/common/PageWrapper.jsx'
import PageHeader from '@/components/common/PageHeader.jsx'
import Card from '@/components/common/Card.jsx'
import Badge from '@/components/common/Badge.jsx'
import Button from '@/components/common/Button.jsx'
import Input from '@/components/common/Input.jsx'
import Select from '@/components/common/Select.jsx'
import { useToast } from '@/context/ToastContext.jsx'
import fertilizerData from '@/data/fertilizer.json'
import { staggerContainer, fadeInUp } from '@/utils/motionVariants.js'
import { classNames } from '@/utils/formatters.js'

const CROPS       = fertilizerData.crops
const SOIL_TYPES  = fertilizerData.soilTypes
const STAGES      = fertilizerData.growthStages
const MOCK_REC    = fertilizerData.recommendations[0]

function Fertilizer() {
  const toast = useToast()
  const [form, setForm] = useState({ crop: '', soilType: '', growthStage: '', area: '', ph: '', moisture: '' })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  // Track mounted state to prevent state updates after unmount (async leak fix)
  const mountedRef = useRef(true)
  useEffect(() => {
    mountedRef.current = true
    return () => { mountedRef.current = false }
  }, [])

  // Bug fix #1 — clear stale result whenever the user changes any form field
  const set = (k) => (e) => {
    setResult(null)
    setForm((p) => ({ ...p, [k]: typeof e === 'string' ? e : e.target.value }))
  }

  const handleSubmit = async () => {
    if (!form.crop || !form.soilType) {
      toast.warning('Missing inputs', 'Please select at least Crop and Soil Type.')
      return
    }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1600))
    // Bug fix #2 — only update state if still mounted (guard against sidebar navigation mid-load)
    if (!mountedRef.current) return
    setLoading(false)
    setResult(MOCK_REC)
    toast.success('Recommendation ready', `Fertilizer plan generated for ${form.crop || MOCK_REC.crop}.`)
  }

  return (
    <PageWrapper>
      <PageHeader
        icon={HiOutlineBeaker}
        accent="emerald"
        title="Fertilizer Recommendation"
        description="Get AI-driven fertilizer plans based on your crop, soil type, nutrient levels, and growth stage."
        badge={{ label: 'AI Assisted', status: 'info' }}
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {}
        <Card hover={false} className="xl:col-span-1 h-fit">
          <h2 className="font-display font-semibold text-ink mb-4">Farm Details</h2>
          <div className="flex flex-col gap-4">
            <Select label="Crop"         options={CROPS}      placeholder="Select crop"      value={form.crop}        onChange={set('crop')} />
            <Select label="Soil Type"    options={SOIL_TYPES} placeholder="Select soil type" value={form.soilType}    onChange={set('soilType')} />
            <Select label="Growth Stage" options={STAGES}     placeholder="Select stage"     value={form.growthStage} onChange={set('growthStage')} />
            <div className="grid grid-cols-2 gap-3">
              <Input label="Area (ha)"  placeholder="e.g. 2" type="number" value={form.area}     onChange={set('area')} />
              <Input label="Soil pH"    placeholder="0–14"   type="number" value={form.ph}       onChange={set('ph')} />
              <Input label="Moisture %" placeholder="%"      type="number" value={form.moisture} onChange={set('moisture')} />
            </div>
            <Button icon={HiOutlineSparkles} loading={loading} onClick={handleSubmit} className="w-full mt-1">
              {loading ? 'Generating…' : 'Get Recommendation'}
            </Button>
          </div>
        </Card>

        {}
        <div className="xl:col-span-2 flex flex-col gap-5">
          {result ? (
            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex flex-col gap-5">
              {}
              <motion.div variants={fadeInUp} className="glass-card p-5">
                <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
                  <div>
                    <p className="text-xs text-ink-3 mb-1">Primary Fertilizer</p>
                    <h2 className="font-display text-xl font-bold text-ink">{result.primaryFertilizer.name}</h2>
                  </div>
                  <Badge status="optimal">Recommended</Badge>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: 'Quantity',  value: `${result.primaryFertilizer.quantity} ${result.primaryFertilizer.unit}` },
                    { label: 'Method',    value: result.primaryFertilizer.method },
                    { label: 'Timing',    value: result.primaryFertilizer.timing },
                    { label: 'Est. Cost', value: `₹${result.primaryFertilizer.cost.toLocaleString('en-IN')}` },
                  ].map(({ label, value }) => (
                    <div key={label} className="glass rounded-xl px-3 py-2.5">
                      <p className="text-xs text-ink-3">{label}</p>
                      <p className="text-sm font-semibold text-ink mt-0.5">{value}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <motion.div variants={fadeInUp} className="glass-card p-5">
                  <p className="text-xs text-ink-3 mb-2">Secondary Fertilizer</p>
                  <p className="font-semibold text-ink">{result.secondaryFertilizer.name}</p>
                  <p className="text-xs text-ink-2 mt-1">{result.secondaryFertilizer.quantity} {result.secondaryFertilizer.unit}</p>
                  <p className="text-xs text-ink-3 mt-0.5">{result.secondaryFertilizer.timing}</p>
                  <Badge status="info" className="mt-2">₹{result.secondaryFertilizer.cost.toLocaleString('en-IN')}</Badge>
                </motion.div>

                <motion.div variants={fadeInUp} className="glass-card p-5">
                  <p className="text-xs text-ink-3 mb-2">Micronutrients</p>
                  {result.micronutrients.map((m) => (
                    <div key={m.name} className="flex items-start gap-2 mb-2">
                      <span className="text-accent-amber text-sm mt-0.5 shrink-0">▸</span>
                      <div>
                        <p className="text-sm font-medium text-ink">{m.name} — {m.quantity} {m.unit}</p>
                        <p className="text-xs text-ink-3">{m.reason}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {}
              <motion.div variants={fadeInUp} className="glass-card p-5">
                <div className="flex items-center gap-2 text-primary-400 mb-3">
                  <HiOutlineGlobeAlt className="text-lg" />
                  <h3 className="font-semibold text-ink">Organic Alternative</h3>
                </div>
                <p className="font-semibold text-ink">{result.organicAlternative.name}</p>
                <p className="text-xs text-ink-3 mt-1">{result.organicAlternative.quantity}</p>
                <p className="text-xs text-ink-2 mt-1">{result.organicAlternative.benefit}</p>
              </motion.div>

              {}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <motion.div variants={fadeInUp} className="glass-card p-4 text-center">
                  <HiOutlineCurrencyRupee className="text-2xl text-primary-400 mx-auto mb-1" />
                  <p className="text-xs text-ink-3">Total Est. Cost</p>
                  <p className="font-display text-xl font-bold text-ink">₹{result.estimatedCost.toLocaleString('en-IN')}</p>
                </motion.div>
                <motion.div variants={fadeInUp} className="glass-card p-4 text-center">
                  <HiOutlineSparkles className="text-2xl text-accent-amber mx-auto mb-1" />
                  <p className="text-xs text-ink-3">Expected Yield Gain</p>
                  <p className="font-display text-xl font-bold text-primary-400">+{result.expectedYieldGain}%</p>
                </motion.div>
                <motion.div variants={fadeInUp} className="glass-card p-4">
                  <div className="flex items-center gap-2 text-accent-rose mb-2">
                    <HiOutlineExclamationTriangle />
                    <p className="text-xs font-semibold text-ink">Safety Notes</p>
                  </div>
                  {result.safetyNotes.slice(0, 2).map((n, i) => (
                    <p key={i} className="text-xs text-ink-2 mb-1">• {n}</p>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <Card hover={false} className="flex items-center justify-center py-24">
              <div className="text-center">
                <HiOutlineBeaker className="text-4xl text-ink-3 mx-auto mb-3" />
                <p className="text-ink-3 text-sm">Select your crop and soil details to get a tailored fertilizer plan.</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </PageWrapper>
  )
}

export default Fertilizer
