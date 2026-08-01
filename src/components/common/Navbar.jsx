import { useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiBars3, HiXMark, HiArrowRightOnRectangle } from 'react-icons/hi2'
import Logo from '../common/Logo.jsx'
import Button from '../common/Button.jsx'
import { ROUTES } from '../../utils/constants.js'
import { classNames } from '../../utils/formatters.js'

const navLinks = [
  { label: 'Home', to: ROUTES.HOME, type: 'route' },
  { label: 'Features', to: '#features', type: 'anchor' },
  { label: 'Dashboard', to: ROUTES.DASHBOARD, type: 'route' },
  { label: 'Contact', to: '#contact', type: 'anchor' },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const handleAnchor = (hash) => {
    setMenuOpen(false)
    if (location.pathname !== ROUTES.HOME) {
      navigate(ROUTES.HOME)
      setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
      }, 350)
    } else {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const linkClasses = (isActive) =>
    classNames(
      'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
      isActive
        ? 'text-primary-300 bg-primary-500/10'
        : 'text-night-200 hover:text-white hover:bg-white/5',
    )

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="glass-strong border-x-0 border-t-0 rounded-none">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Logo />
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.label}>
                {link.type === 'route' ? (
                  <NavLink
                    to={link.to}
                    end={link.to === ROUTES.HOME}
                    className={({ isActive }) => linkClasses(isActive)}
                  >
                    {link.label}
                  </NavLink>
                ) : (
                  <button
                    onClick={() => handleAnchor(link.to)}
                    className={classNames(linkClasses(false), 'cursor-pointer')}
                  >
                    {link.label}
                  </button>
                )}
              </li>
            ))}
          </ul>
          <div className="hidden md:block">
            <Link to={ROUTES.DASHBOARD}>
              <Button size="sm" icon={HiArrowRightOnRectangle}>
                Login
              </Button>
            </Link>
          </div>
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="md:hidden text-2xl text-night-100 p-2 cursor-pointer"
            aria-label="Toggle menu"
          >
            {menuOpen ? <HiXMark /> : <HiBars3 />}
          </button>
        </nav>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden glass-strong border-x-0 rounded-none overflow-hidden"
          >
            <ul className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.label}>
                  {link.type === 'route' ? (
                    <NavLink
                      to={link.to}
                      end={link.to === ROUTES.HOME}
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) =>
                        classNames(
                          'block px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                          isActive
                            ? 'text-primary-300 bg-primary-500/10'
                            : 'text-night-200 hover:text-white hover:bg-white/5',
                        )
                      }
                    >
                      {link.label}
                    </NavLink>
                  ) : (
                    <button
                      onClick={() => handleAnchor(link.to)}
                      className="block w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-night-200 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      {link.label}
                    </button>
                  )}
                </li>
              ))}
              <li className="pt-2">
                <Link to={ROUTES.DASHBOARD} onClick={() => setMenuOpen(false)}>
                  <Button className="w-full" icon={HiArrowRightOnRectangle}>
                    Login
                  </Button>
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
