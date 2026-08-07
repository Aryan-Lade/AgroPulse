import { useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/**
 * Particles — ambient floating specks for the hero background.
 * A small fixed set of divs animating transform+opacity only (fully
 * GPU-composited). Positions are deterministic per mount; density is
 * intentionally low to stay well within a 60fps budget.
 */
function Particles({ count = 18, className = '' }) {
  const prefersReduced = useReducedMotion()

  const particles = useMemo(() => {
    // Deterministic pseudo-random layout — stable across re-renders.
    const rand = (seed) => {
      const x = Math.sin(seed * 999) * 10000
      return x - Math.floor(x)
    }
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: rand(i + 1) * 100,
      top: rand(i + 31) * 100,
      size: 2 + rand(i + 61) * 3,
      duration: 6 + rand(i + 91) * 8,
      delay: rand(i + 121) * 6,
      drift: (rand(i + 151) - 0.5) * 40,
      opacity: 0.15 + rand(i + 181) * 0.35,
    }))
  }, [count])

  if (prefersReduced) return null

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-primary-300 will-change-transform"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -60, 0],
            x: [0, p.drift, 0],
            opacity: [0, p.opacity, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

export default Particles
