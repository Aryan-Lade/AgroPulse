import CountUp from '../common/CountUp.jsx'

/**
 * AnimatedCounter — landing-page stat counter.
 * Thin wrapper over the shared spring-driven CountUp so marketing and
 * dashboard numbers share one motion signature.
 */
function AnimatedCounter({ target, decimals = 0, suffix = '', prefix = '' }) {
  return <CountUp value={target} decimals={decimals} suffix={suffix} prefix={prefix} />
}

export default AnimatedCounter
