import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HiOutlineBugAnt, HiOutlineArrowUpTray, HiOutlineCamera,
  HiOutlineXMark, HiOutlineCheckCircle, HiOutlineExclamationTriangle,
  HiOutlineEye, HiOutlineTrash, HiOutlineBeaker,
} from 'react-icons/hi2'
import PageWrapper from '@/components/common/PageWrapper.jsx'
import PageHeader from '@/components/common/PageHeader.jsx'
import Card from '@/components/common/Card.jsx'
import Badge from '@/components/common/Badge.jsx'
import Button from '@/components/common/Button.jsx'
import EmptyState from '@/components/common/EmptyState.jsx'
import { useToast } from '@/context/ToastContext.jsx'
import diseaseHistory from '@/data/diseaseHistory.json'
import { staggerContainer, fadeInUp } from '@/utils/motionVariants.js'
import { classNames, formatDate } from '@/utils/formatters.js'

/* ── mock AI result shown after "analysis" ───────────────────────── */
const MOCK_RESULT = {
  crop: 'Rice',
  disease: 'Rice Blast',
  scientificName: 'Magnaporthe oryzae',
  confidence: 94.6,
  severity: 'critical',
  affectedArea: '18%',
  symptoms: ['Diamond-shaped lesions with grey centres', 'Dark brown borders on leaf blades', 'Collar rot at leaf node'],
  causes: ['High humidity (>90%) for 48h+', 'Night temperatures 17–19°C', 'Excessive nitrogen fertilisation'],
  treatment: ['Apply Tricyclazole 75 WP @ 0.6 g/L', 'Spray Isoprothiolane 40 EC @ 1.5 ml/L', 'Avoid overhead irrigation for 5 days'],
  prevention: ['Use resistant varieties (IR-64, Swarna)', 'Balanced nitrogen application', 'Field sanitation after harvest'],
}

/* ── Upload zone ─────────────────────────────────────────────────── */
function UploadZone({ onFileSelected }) {
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(false)

  const handle = (file) => {
    if (!file || !file.type.startsWith('image/')) return
    onFileSelected(file)
  }

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => { e.preventDefault(); setDragging(false); handle(e.dataTransfer.files[0]) }}
      onClick={() => inputRef.current?.click()}
      className={classNames(
        'flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed',
        'cursor-pointer transition-all duration-300 py-14 px-6 text-center',
        dragging
          ? 'border-primary-500 bg-primary-500/10'
          : 'border-line-2 hover:border-primary-500/50 hover:bg-primary-500/5',
      )}
    >
      <span className="size-14 rounded-2xl bg-primary-500/15 text-primary-300 flex items-center justify-center text-3xl">
        <HiOutlineArrowUpTray />
      </span>
      <div>
        <p className="font-semibold text-ink">Drop your crop image here</p>
        <p className="text-sm text-ink-3 mt-1">or click to browse — JPG, PNG, WEBP up to 10 MB</p>
      </div>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handle(e.target.files[0])} />
    </div>
  )
}

/* ── Result panel ────────────────────────────────────────────────── */
function ResultPanel({ result, onReset }) {
  const severityMap = { critical: 'critical', warning: 'warning', healthy: 'healthy' }
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex flex-col gap-5">
      {/* Header */}
      <motion.div variants={fadeInUp} className="glass-card p-5 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs text-ink-3 mb-1">Detected Disease</p>
          <h2 className="font-display text-xl font-bold text-ink">{result.disease}</h2>
          <p className="text-sm text-ink-2 italic">{result.scientificName}</p>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <Badge status={severityMap[result.severity]}>{result.severity} severity</Badge>
            <Badge status="info">Confidence {result.confidence}%</Badge>
            <Badge status="warning">Area affected: {result.affectedArea}</Badge>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-ink-3">Crop</p>
          <p className="font-semibold text-ink">{result.crop}</p>
        </div>
      </motion.div>

      {/* Details grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: 'Symptoms',           icon: HiOutlineEye,                 items: result.symptoms,    color: 'text-accent-rose'  },
          { title: 'Possible Causes',    icon: HiOutlineExclamationTriangle, items: result.causes,     color: 'text-accent-amber' },
          { title: 'Recommended Treatment', icon: HiOutlineBeaker,          items: result.treatment,  color: 'text-primary-300'  },
        ].map(({ title, icon: Icon, items, color }) => (
          <motion.div key={title} variants={fadeInUp} className="glass-card p-5">
            <div className={classNames('flex items-center gap-2 mb-3', color)}>
              <Icon className="text-lg" />
              <h3 className="font-semibold text-sm text-ink">{title}</h3>
            </div>
            <ul className="flex flex-col gap-2">
              {items.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-ink-2">
                  <span className={classNames('size-1.5 rounded-full mt-1.5 shrink-0 bg-current', color)} />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Prevention */}
      <motion.div variants={fadeInUp} className="glass-card p-5">
        <div className="flex items-center gap-2 text-primary-300 mb-3">
          <HiOutlineCheckCircle className="text-lg" />
          <h3 className="font-semibold text-sm text-ink">Preventive Measures</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {result.prevention.map((p, i) => (
            <span key={i} className="glass px-3 py-1.5 rounded-lg text-xs text-ink-2">{p}</span>
          ))}
        </div>
      </motion.div>

      <Button variant="secondary" onClick={onReset} className="self-start">
        Analyse Another Image
      </Button>
    </motion.div>
  )
}

/* ── Main page ───────────────────────────────────────────────────── */
function DiseaseDetection() {
  const toast = useToast()
  const [file, setFile]       = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult]   = useState(null)

  const handleFile = (f) => {
    setFile(f)
    setPreview(URL.createObjectURL(f))
    setResult(null)
  }

  const handleAnalyse = async () => {
    if (!file) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 2200))
    setLoading(false)
    setResult(MOCK_RESULT)
    toast.success('Analysis complete', `${MOCK_RESULT.disease} detected with ${MOCK_RESULT.confidence}% confidence.`)
  }

  const handleReset = () => { setFile(null); setPreview(null); setResult(null) }

  const historyRows = diseaseHistory?.data ?? []

  return (
    <PageWrapper>
      <PageHeader
        icon={HiOutlineBugAnt}
        accent="rose"
        title="AI Disease Detection"
        description="Upload a leaf image and our vision model identifies diseases with lab-grade accuracy, plus instant treatment plans."
        badge={{ label: 'AI Powered', status: 'info' }}
      />

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* Left — upload / result */}
        <div className="xl:col-span-3 flex flex-col gap-5">
          {!result ? (
            <Card hover={false}>
              <h2 className="font-display font-semibold text-ink mb-4">Upload Crop Image</h2>
              {!preview ? (
                <UploadZone onFileSelected={handleFile} />
              ) : (
                <div className="flex flex-col gap-4">
                  <div className="relative rounded-2xl overflow-hidden bg-surface-2 aspect-video">
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      onClick={handleReset}
                      className="absolute top-3 right-3 size-8 rounded-full glass flex items-center justify-center text-ink-2 hover:text-ink cursor-pointer"
                      aria-label="Remove image"
                    >
                      <HiOutlineXMark />
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button icon={HiOutlineBugAnt} loading={loading} onClick={handleAnalyse} className="flex-1">
                      {loading ? 'Analysing…' : 'Analyse Disease'}
                    </Button>
                    <Button variant="secondary" icon={HiOutlineTrash} onClick={handleReset}>
                      Remove
                    </Button>
                  </div>
                  {loading && (
                    <div className="glass rounded-xl px-4 py-3 text-xs text-ink-2 flex items-center gap-2">
                      <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="size-4 rounded-full border-2 border-primary-500 border-t-transparent shrink-0" />
                      Running vision model… analysing leaf texture and lesion patterns
                    </div>
                  )}
                </div>
              )}
              <div className="flex gap-3 mt-4">
                <button className="flex items-center gap-2 glass px-4 py-2.5 rounded-xl text-sm text-ink-2 hover:text-ink transition-colors cursor-pointer">
                  <HiOutlineCamera className="text-base" /> Use Camera
                </button>
              </div>
            </Card>
          ) : (
            <ResultPanel result={result} onReset={handleReset} />
          )}
        </div>

        {/* Right — detection history */}
        <div className="xl:col-span-2">
          <Card hover={false} className="h-fit">
            <h2 className="font-display font-semibold text-ink mb-4">Detection History</h2>
            {historyRows.length === 0 ? (
              <EmptyState icon={HiOutlineBugAnt} title="No scans yet" description="Upload your first crop image to get started." />
            ) : (
              <div className="flex flex-col gap-3 max-h-[600px] overflow-y-auto pr-1">
                {historyRows.map((item) => (
                  <div key={item.id} className="glass rounded-xl px-4 py-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-ink truncate">{item.diseaseName}</p>
                        <p className="text-xs text-ink-3">{item.cropName} · {formatDate(item.date)}</p>
                      </div>
                      <Badge status={item.severity ?? 'neutral'}>{item.severity}</Badge>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-ink-3">Confidence: {item.confidence}%</span>
                      <span className={classNames('text-xs font-medium',
                        item.status === 'resolved' ? 'text-primary-400' : 'text-accent-amber',
                      )}>{item.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </PageWrapper>
  )
}

export default DiseaseDetection
