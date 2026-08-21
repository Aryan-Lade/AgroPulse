import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HiBars3,
  HiXMark,
  HiOutlineSun,
  HiOutlineMoon,
  HiArrowRight,
} from 'react-icons/hi2'
import Logo from '../common/Logo.jsx'
import Button from '../common/Button.jsx'
import { ROUTES } from '../../utils/constants.js'
import { classNames } from '../../utils/formatters.js'
import { useTheme } from '../../context/ThemeContext.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { SPRING_SOFT } from '../../utils/motionVariants.js'

const navLinks = [
  { label: 'Home', to: ROUTES.HOME, type: 'route' },
  { label: 'Features', to: '#features', type: 'anchor' },
  { label: 'How It Works', to: '#how-it-works', type: 'anchor' },
  { label: 'Solutions', to: '#solutions', type: 'anchor' },
  { label: 'About', to: '#about', type: 'anchor' },
  { label: 'Contact', to: '#contact', type: 'anchor' },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { isDark, toggleTheme } = useTheme()
  const { isLoggedIn, logout } = useAuth()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

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

  const desktopLinkClasses = (isActive) =>
    classNames(
      'px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200',
      isActive
        ? 'text-primary-300 bg-primary-500/10'
        : 'text-night-200 hover:text-white hover:bg-white/5',
    )

  const mobileLinkClasses = (isActive) =>
    classNames(
      'block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors duration-200',
      isActive
        ? 'text-primary-300 bg-primary-500/10'
        : 'text-night-200 hover:text-white hover:bg-white/5',
    )

  return (
    <>
      <header
        className={classNames(
          'fixed top-0 inset-x-0 z-50 force-dark transition-all duration-300',
          scrolled
            ? 'glass-strong border-b border-white/10 shadow-glass'
            : 'bg-transparent border-b border-transparent',
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {}
          <ul className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <li key={link.label}>
                {link.type === 'route' ? (
                  <NavLink
                    to={link.to}
                    end={link.to === ROUTES.HOME}
                    className={({ isActive }) => desktopLinkClasses(isActive)}
                  >
                    {link.label}
                  </NavLink>
                ) : (
                  <button
                    onClick={() => handleAnchor(link.to)}
                    className={classNames(desktopLinkClasses(false), 'cursor-pointer')}
                  >
                    {link.label}
                  </button>
                )}
              </li>
            ))}
          </ul>

          {}
          <div className="hidden lg:flex items-center gap-2">
            {}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              transition={SPRING_SOFT}
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="size-9 rounded-lg flex items-center justify-center text-night-200 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              {isDark ? (
                <HiOutlineSun className="text-xl" />
              ) : (
                <HiOutlineMoon className="text-xl" />
              )}
            </motion.button>

            {}
            {isLoggedIn ? (
              <>
                <Link to={ROUTES.DASHBOARD}>
                  <Button size="sm" icon={HiArrowRight}>
                    Dashboard
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={() => logout()}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to={ROUTES.LOGIN}>
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to={ROUTES.REGISTER}>
                  <Button size="sm" icon={HiArrowRight}>
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {}
          <div className="lg:hidden flex items-center gap-1">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              transition={SPRING_SOFT}
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="size-9 rounded-lg flex items-center justify-center text-night-200 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              {isDark ? (
                <HiOutlineSun className="text-xl" />
              ) : (
                <HiOutlineMoon className="text-xl" />
              )}
            </motion.button>

            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="size-9 rounded-lg flex items-center justify-center text-xl text-night-100 hover:bg-white/5 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <HiXMark /> : <HiBars3 />}
            </button>
          </div>
        </nav>
      </header>

      {}
      <AnimatePresence>
        {menuOpen && (
          <>
            {}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 bg-night-950/60 backdrop-blur-sm lg:hidden"
              aria-hidden="true"
            />

            {}
            <motion.div
              key="drawer"
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={SPRING_SOFT}
              className="fixed top-0 right-0 bottom-0 z-50 w-80 max-w-full force-dark glass-strong border-l border-white/10 flex flex-col lg:hidden"
            >
              {}
              <div className="flex items-center justify-between px-5 h-16 border-b border-white/10 flex-shrink-0">
                <Logo size="sm" />
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="size-9 rounded-lg flex items-center justify-center text-xl text-night-100 hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <HiXMark />
                </button>
              </div>

              {}
              <nav className="flex-1 overflow-y-auto px-4 py-6">
                <ul className="flex flex-col gap-1">
                  {navLinks.map((link, i) => (
                    <motion.li
                      key={link.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 + 0.1, duration: 0.3 }}
                    >
                      {link.type === 'route' ? (
                        <NavLink
                          to={link.to}
                          end={link.to === ROUTES.HOME}
                          onClick={() => setMenuOpen(false)}
                          className={({ isActive }) => mobileLinkClasses(isActive)}
                        >
                          {link.label}
                        </NavLink>
                      ) : (
                        <button
                          onClick={() => handleAnchor(link.to)}
                          className={mobileLinkClasses(false) + ' cursor-pointer'}
                        >
                          {link.label}
                        </button>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.3 }}
                className="px-4 py-6 border-t border-white/10 flex flex-col gap-3 flex-shrink-0"
              >
                {isLoggedIn ? (
                  <>
                    <Link to={ROUTES.DASHBOARD} onClick={() => setMenuOpen(false)}>
                      <Button icon={HiArrowRight} className="w-full justify-center">
                        Dashboard
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      className="w-full justify-center text-accent-rose hover:bg-accent-rose/10"
                      onClick={() => {
                        setMenuOpen(false)
                        logout()
                      }}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to={ROUTES.LOGIN} onClick={() => setMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-center">
                        Login
                      </Button>
                    </Link>
                    <Link to={ROUTES.REGISTER} onClick={() => setMenuOpen(false)}>
                      <Button icon={HiArrowRight} className="w-full justify-center">
                        Get Started
                      </Button>
                    </Link>
                  </>
                )}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
