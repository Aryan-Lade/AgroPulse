import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

function useCountUp(target, duration = 2000, start = false) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!start) return
    let frame
    let startTime = null

    const step = (timestamp) => {
      if (startTime === null) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(target * eased)
      if (progress < 1) {
        frame = requestAnimationFrame(step)
      }
    }

    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [target, duration, start])

  return value
}

function AnimatedCounter({ target, decimals = 0, suffix = '', prefix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const value = useCountUp(target, 2200, inView)

  const formatted =
    decimals > 0
      ? value.toFixed(decimals)
      : Math.round(value).toLocaleString('en-US')

  return (
    <span ref={ref}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}

export default AnimatedCounter
