import { motion } from 'framer-motion'
import {
  HiOutlineCloud, HiOutlineSun, HiOutlineBolt,
  HiOutlineBeaker, HiOutlineArrowUp, HiOutlineArrowDown,
  HiOutlineEye, HiOutlineWifi,
} from 'react-icons/hi2'
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts'
import PageWrapper from '@/components/common/PageWrapper.jsx'
import PageHeader from '@/components/common/PageHeader.jsx'
import Card from '@/components/common/Card.jsx'
import Badge from '@/components/common/Badge.jsx'
import { useChartTheme } from '@/hooks/useChartTheme.js'
import weatherJson from '@/data/weather.json'
import { staggerContainer, fadeInUp } from '@/utils/motionVariants.js'
import { classNames } from '@/utils/formatters.js'

/* ── Current weather metric tile ───────────────────────────────── */
function MetricTile({ icon: Icon, label, value, sub, color = 'text-ink-2' }) {
  return (
    <div className="glass rounded-xl px-4 py-3 flex items-center gap-3">
      <span className={classNames('text-xl shrink-0', color)}><Icon /></span>
      <div className="min-w-0">
        <p className="text-xs text-ink-3">{label}</p>
        <p className="font-bold text-ink leading-tight">{value}</p>
        {sub && <p className="text-xs text-ink-3">{sub}</p>}
      </div>
    </div>
  )
}

/* ── 7-day forecast row ─────────────────────────────────────────── */
function ForecastRow({ day, icon: Icon, high, low, rain, condition }) {
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-line last:border-0">
      <p className="w-10 text-xs font-semibold text-ink-2 shrink-0">{day}</p>
      <span className="text-lg text-ink-2"><Icon /></span>
      <p className="flex-1 text-xs text-ink-2 truncate">{condition}</p>
      <div className="flex items-center gap-1.5 text-xs text-ink-3">
        <HiOutlineCloud className="text-accent-sky" /> {rain}%
      </div>
      <p className="text-xs font-semibold text-ink w-14 text-right">{high}° / {low}°</p>
    </div>
  )
}

/* ── AI Insight card ────────────────────────────────────────────── */
function InsightCard({ type, title, detail, priority }) {
  const colorMap = {
    high:   'border-l-accent-rose   bg-accent-rose/5',
    medium: 'border-l-accent-amber  bg-accent-amber/5',
    low:    'border-l-primary-500   bg-primary-500/5',
  }
  return (
    <div className={classNames('border-l-4 rounded-r-xl px-4 py-3', colorMap[priority] ?? colorMap.low)}>
      <div className="flex items-center justify-between gap-2 mb-1">
        <p className="text-sm font-semibold text-ink">{title}</p>
        <Badge status={priority === 'high' ? 'critical' : priority === 'medium' ? 'warning' : 'optimal'}>
          {priority}
        </Badge>
      </div>
      <p className="text-xs text-ink-2 leading-relaxed">{detail}</p>
    </div>
  )
}

function Weather() {
  const { palette, axisProps, gridProps, animationProps, tooltipProps } = useChartTheme()

  const current   = weatherJson.current   ?? {}
  const forecast  = weatherJson.forecast  ?? []
  const hourly    = weatherJson.hourly    ?? []
  const insights  = weatherJson.aiInsights ?? []
  /* weather.json uses 'precipitation' — map to rainProbability for display */
  const rainProb  = current.precipitation ?? 42

  /* Build hourly temp+humidity data — JSON uses 'temp' and 'rain' fields */
  const hourlyData = hourly.slice(0, 12).map((h) => ({
    time:     h.time,
    temp:     h.temp ?? h.temperature,
    humidity: h.humidity,
    rain:     h.rain ?? h.rainProbability ?? 0,
  }))

  return (
    <PageWrapper>
      <PageHeader
        icon={HiOutlineCloud}
        accent="sky"
        title="Weather Intelligence"
        description="Hyperlocal forecasts, AI-driven irrigation and harvest recommendations, and 7-day outlook for your farm."
        badge={{ label: 'Live Data', status: 'info' }}
      />

      {/* Current conditions strip */}
      <motion.div variants={staggerContainer} initial="hidden" animate="visible">
        <motion.div variants={fadeInUp} className="glass-card p-5 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div>
              <p className="text-xs text-ink-3">{current.location ?? 'Greenfield Farm, Punjab'}</p>
              <div className="flex items-end gap-3 mt-1">
                <span className="font-display text-5xl font-bold text-ink">{current.temperature ?? 29}°</span>
                <div>
                  <p className="font-semibold text-ink">{current.condition ?? 'Partly Cloudy'}</p>
                  <p className="text-xs text-ink-3">Feels like {current.feelsLike ?? 32}°C</p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge status="info">Sunrise {current.sunrise ?? '05:52'}</Badge>
              <Badge status="info">Sunset {current.sunset ?? '19:08'}</Badge>
              <Badge status={rainProb > 60 ? 'warning' : 'optimal'}>
                Rain {rainProb}%
              </Badge>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <MetricTile icon={HiOutlineBeaker}  label="Humidity"   value={`${current.humidity ?? 68}%`}     color="text-accent-sky"   />
            <MetricTile icon={HiOutlineWifi}    label="Wind"       value={`${current.windSpeed ?? 14} km/h`} color="text-ink-2"        />
            <MetricTile icon={HiOutlineSun}     label="UV Index"   value={current.uvIndex ?? 6}               color="text-accent-amber" />
            <MetricTile icon={HiOutlineBolt}    label="Rain Prob." value={`${rainProb}%`}                     color="text-accent-rose"  />
          </div>
        </motion.div>

        {/* Temperature + humidity chart */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mb-5">
          <motion.div variants={fadeInUp}>
            <Card hover={false}>
              <h2 className="font-display font-semibold text-ink mb-4">Temperature &amp; Humidity (12h)</h2>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={hourlyData}>
                  <CartesianGrid {...gridProps} />
                  <XAxis dataKey="time" {...axisProps} />
                  <YAxis {...axisProps} />
                  <Tooltip {...tooltipProps} />
                  <Legend {...{wrapperStyle:{fontSize:12,color:palette.legendText}}} />
                  <Line dataKey="temp"     name="Temp (°C)"   stroke={palette.series[0]} strokeWidth={2} dot={false} {...animationProps} />
                  <Line dataKey="humidity" name="Humidity (%)" stroke={palette.series[2]} strokeWidth={2} dot={false} {...animationProps} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>

          {/* Rain probability chart */}
          <motion.div variants={fadeInUp}>
            <Card hover={false}>
              <h2 className="font-display font-semibold text-ink mb-4">Rain Probability (12h)</h2>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={hourlyData}>
                  <defs>
                    <linearGradient id="rainGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={palette.series[2]} stopOpacity={0.3} />
                      <stop offset="100%" stopColor={palette.series[2]} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid {...gridProps} />
                  <XAxis dataKey="time" {...axisProps} />
                  <YAxis {...axisProps} domain={[0, 100]} />
                  <Tooltip {...tooltipProps} />
                  <Area dataKey="rain" name="Rain %" stroke={palette.series[2]} fill="url(#rainGrad)" strokeWidth={2} {...animationProps} />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </div>

        {/* 7-day forecast + AI insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <motion.div variants={fadeInUp}>
            <Card hover={false}>
              <h2 className="font-display font-semibold text-ink mb-3">7-Day Forecast</h2>
              <div>
                {(forecast.length ? forecast : [
                  { day:'Mon', condition:'Sunny',        high:33, low:24, rain:10  },
                  { day:'Tue', condition:'Partly Cloudy',high:31, low:23, rain:25  },
                  { day:'Wed', condition:'Cloudy',       high:29, low:22, rain:55  },
                  { day:'Thu', condition:'Heavy Rain',   high:27, low:21, rain:85  },
                  { day:'Fri', condition:'Rain Showers', high:26, low:20, rain:72  },
                  { day:'Sat', condition:'Clearing',     high:28, low:21, rain:40  },
                  { day:'Sun', condition:'Sunny',        high:30, low:22, rain:15  },
                ]).map((d) => (
                  <ForecastRow key={d.day} icon={d.rain > 60 ? HiOutlineCloud : HiOutlineSun} {...d} />
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card hover={false}>
              <h2 className="font-display font-semibold text-ink mb-3">AI Farm Insights</h2>
              <div className="flex flex-col gap-3">
                {(insights.length ? insights : [
                  { title:'Delay irrigation tonight', detail:'38 mm of rain expected Thu–Fri. Skip the scheduled irrigation run to conserve water.', priority:'high' },
                  { title:'Hold pesticide spraying', detail:'Wind speed above 20 km/h tomorrow afternoon. Reschedule to early morning Saturday.', priority:'medium' },
                  { title:'Wheat harvest window', detail:'Dry spell from Saturday onwards is ideal for combine harvesting North Field.', priority:'low' },
                  { title:'Frost risk — nil', detail:'Minimum temperature stays above 18°C through the 7-day window. No frost protective action needed.', priority:'low' },
                ]).map((ins, i) => <InsightCard key={i} {...ins} />)}
              </div>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </PageWrapper>
  )
}

export default Weather
