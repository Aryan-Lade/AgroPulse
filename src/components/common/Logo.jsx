import { Link } from 'react-router-dom'
import { FaLeaf } from 'react-icons/fa6'
import { APP_NAME, ROUTES } from '../../utils/constants.js'

function Logo({ size = 'md' }) {
  const sizes = {
    sm: { icon: 'size-8 text-sm', text: 'text-base' },
    md: { icon: 'size-10 text-base', text: 'text-lg' },
    lg: { icon: 'size-12 text-lg', text: 'text-xl' },
  }

  return (
    <Link to={ROUTES.HOME} className="flex items-center gap-2.5 group">
      <span
        className={`${sizes[size].icon} rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white shadow-glow group-hover:shadow-lg transition-shadow`}
      >
        <FaLeaf />
      </span>
      <span className={`font-display font-bold ${sizes[size].text} text-white`}>
        AgriVision<span className="text-gradient"> AI</span>
      </span>
      <span className="sr-only">{APP_NAME}</span>
    </Link>
  )
}

export default Logo
