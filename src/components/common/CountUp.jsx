import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

function CountUp({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  className,
  locale = 'en-US',
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const prefersReduced = useReducedMotion()

  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { stiffness: 60, damping: 20 })

  useEffect(() => {
    if (inView) motionValue.set(value)
  }, [inView, value, motionValue])

  useEffect(() => {
    const format = (v) =>
      `${prefix}${v.toLocaleString(locale, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}${suffix}`

    if (prefersReduced) {
      if (ref.current) ref.current.textContent = format(value)
      return undefined
    }
    const unsubscribe = spring.on('change', (v) => {
      if (ref.current) ref.current.textContent = format(v)
    })
    return unsubscribe
  }, [spring, prefix, suffix, decimals, locale, prefersReduced, value])

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  )
}

export default CountUp
