import { motion } from 'framer-motion'

function FarmIllustration() {
  return (
    <div className="relative w-full max-w-xl mx-auto">
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="relative"
      >
        <svg viewBox="0 0 520 420" fill="none" className="w-full h-auto drop-shadow-2xl">
          <defs>
            <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0b3d2e" />
              <stop offset="100%" stopColor="#0b120e" />
            </linearGradient>
            <linearGradient id="fieldGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#166534" />
              <stop offset="100%" stopColor="#052e16" />
            </linearGradient>
            <linearGradient id="hillGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#15803d" />
              <stop offset="100%" stopColor="#14532d" />
            </linearGradient>
            <linearGradient id="scanGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4ade80" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#4ade80" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="sunGrad" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.6" />
            </radialGradient>
          </defs>

          <rect x="10" y="10" width="500" height="400" rx="28" fill="url(#skyGrad)" stroke="rgba(255,255,255,0.08)" />

          <motion.circle
            cx="420"
            cy="90"
            r="34"
            fill="url(#sunGrad)"
            animate={{ opacity: [0.8, 1, 0.8], scale: [1, 1.06, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.circle
            cx="420"
            cy="90"
            r="48"
            fill="none"
            stroke="#fbbf24"
            strokeOpacity="0.25"
            strokeDasharray="4 10"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: '420px 90px' }}
          />

          <path d="M10 260 Q140 190 280 250 T510 240 V382 A28 28 0 0 1 482 410 H38 A28 28 0 0 1 10 382 Z" fill="url(#hillGrad)" opacity="0.7" />
          <path d="M10 300 Q160 240 320 295 T510 285 V382 A28 28 0 0 1 482 410 H38 A28 28 0 0 1 10 382 Z" fill="url(#fieldGrad)" />

          {[0, 1, 2, 3].map((row) => (
            <path
              key={row}
              d={`M10 ${315 + row * 24} Q260 ${295 + row * 24} 510 ${310 + row * 24}`}
              stroke="#22c55e"
              strokeOpacity={0.25 - row * 0.04}
              strokeWidth="2"
              fill="none"
            />
          ))}

          {[70, 130, 190, 250, 310, 370, 430].map((x, i) => (
            <motion.g
              key={x}
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ delay: 0.6 + i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: `${x}px 340px` }}
            >
              <path d={`M${x} 340 V310`} stroke="#16a34a" strokeWidth="3" strokeLinecap="round" />
              <path d={`M${x} 322 Q${x - 12} 314 ${x - 14} 302`} stroke="#22c55e" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d={`M${x} 316 Q${x + 12} 308 ${x + 14} 296`} stroke="#4ade80" strokeWidth="3" strokeLinecap="round" fill="none" />
              <motion.circle
                cx={x}
                cy="306"
                r="4"
                fill="#86efac"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.3 }}
              />
            </motion.g>
          ))}

          <motion.g
            animate={{ x: [-60, 60, -60] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.g
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <rect x="230" y="150" width="60" height="18" rx="9" fill="#1e293b" stroke="#4ade80" strokeOpacity="0.5" />
              <circle cx="245" cy="159" r="4" fill="#4ade80" />
              <motion.circle
                cx="275"
                cy="159"
                r="3"
                fill="#f43f5e"
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <line x1="222" y1="150" x2="238" y2="150" stroke="#94a3b8" strokeWidth="2" />
              <line x1="282" y1="150" x2="298" y2="150" stroke="#94a3b8" strokeWidth="2" />
              <motion.ellipse
                cx="230"
                cy="149"
                rx="14"
                ry="3"
                fill="#4ade80"
                fillOpacity="0.4"
                animate={{ scaleX: [1, 0.4, 1] }}
                transition={{ duration: 0.3, repeat: Infinity }}
              />
              <motion.ellipse
                cx="290"
                cy="149"
                rx="14"
                ry="3"
                fill="#4ade80"
                fillOpacity="0.4"
                animate={{ scaleX: [0.4, 1, 0.4] }}
                transition={{ duration: 0.3, repeat: Infinity }}
              />
              <motion.path
                d="M240 170 L225 290 H295 L280 170 Z"
                fill="url(#scanGrad)"
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.g>
          </motion.g>

          {[
            { cx: 90, cy: 120, delay: 0 },
            { cx: 150, cy: 80, delay: 1.2 },
            { cx: 350, cy: 190, delay: 0.6 },
          ].map((leaf) => (
            <motion.path
              key={leaf.cx}
              d={`M${leaf.cx} ${leaf.cy} q6 -10 14 -8 q-2 12 -14 8`}
              fill="#4ade80"
              fillOpacity="0.6"
              animate={{ y: [0, 14, 0], rotate: [0, 20, 0], opacity: [0.6, 0.3, 0.6] }}
              transition={{ duration: 5, repeat: Infinity, delay: leaf.delay, ease: 'easeInOut' }}
            />
          ))}
        </svg>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute -left-4 top-10 glass-card px-4 py-3 flex items-center gap-3"
      >
        <span className="size-2.5 rounded-full bg-primary-400 animate-pulse" />
        <div>
          <p className="text-xs font-semibold text-white">Crop Health</p>
          <p className="text-xs text-primary-300">Excellent · 98%</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute -right-2 bottom-16 glass-card px-4 py-3 flex items-center gap-3"
      >
        <span className="size-2.5 rounded-full bg-accent-sky animate-pulse" />
        <div>
          <p className="text-xs font-semibold text-white">Soil Moisture</p>
          <p className="text-xs text-sky-300">Optimal · 64%</p>
        </div>
      </motion.div>
    </div>
  )
}

export default FarmIllustration
