import CountUp from '../common/CountUp.jsx'


function AnimatedCounter({ target, decimals = 0, suffix = '', prefix = '' }) {
  return <CountUp value={target} decimals={decimals} suffix={suffix} prefix={prefix} />
}

export default AnimatedCounter
