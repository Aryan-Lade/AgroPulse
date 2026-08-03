import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HiBars3,
  HiOutlineBell,
  HiOutlineMagnifyingGlass,
  HiOutlineSun,
  HiOutlineMoon,
  HiOutlineMapPin,
  HiOutlineCalendarDays,
  HiOutlineCloud,
  HiOutlineEnvelope,
  HiOutlineLanguage,
  HiOutlineChevronDown,
  HiOutlineUser,
  HiOutlineCog6Tooth,
  HiOutlineArrowLeftOnRectangle,
} from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import { useApp } from '../../context/AppContext.jsx'
import { useTheme } from '../../context/ThemeContext.jsx'
import {
  currentWeather,
  currentUser,
  messages,
  notifications,
} from '../../data/dashboardData.js'
import { LANGUAGES, ROUTES } from '../../utils/constants.js'
import { classNames, formatDate } from '../../utils/formatters.js'

/** Close-on-outside-click helper for the topbar dropdowns. */
function useClickOutside(onClose) {
  const ref = useRef(null)
  useEffect(() => {
    function handle(event) {
      if (ref.current && !ref.current.contains(event.target)) onClose()
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [onClose])
  return ref
}

/** Icon button used across the topbar. */
function TopbarButton({ children, badge, label, onClick, active }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className={classNames(
        'relative size-10 rounded-xl glass flex items-center justify-center transition-colors cursor-pointer',
        active ? 'text-primary-400' : 'text-ink-2 hover:text-ink',
      )}
    >
      {children}
      {badge > 0 && (
        <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-accent-rose text-white text-[10px] font-bold flex items-center justify-center">
          {badge}
        </span>
      )}
    </button>
  )
}

/** Shared dropdown chrome with entrance animation. */
function Dropdown({ open, children, className }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.97 }}
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className={classNames(
            'absolute right-0 top-full mt-2 rounded-2xl glass-strong shadow-glass overflow-hidden z-50',
            className,
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/**
 * Topbar — search, date, location, weather summary, theme toggle,
 * language selector, messages, notifications and the profile dropdown.
 */
function Topbar() {
  const { toggleSidebar, toggleNotifications, language, setLanguage } = useApp()
  const { isDark, toggleTheme } = useTheme()
  // Which dropdown is open: 'messages' | 'language' | 'profile' | null
  const [menu, setMenu] = useState(null)
  const menuRef = useClickOutside(() => setMenu(null))

  const today = formatDate(new Date('2026-08-03'), {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
  const unreadNotifications = notifications.filter((n) => n.unread).length
  const unreadMessages = messages.filter((m) => m.unread).length

  const toggleMenu = (name) => setMenu((prev) => (prev === name ? null : name))

  return (
    <header className="sticky top-0 z-30 glass-strong border-x-0 border-t-0 rounded-none">
      <div className="h-16 px-4 sm:px-6 flex items-center gap-3">
        {/* Mobile hamburger */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden text-2xl text-ink p-1 cursor-pointer"
          aria-label="Open sidebar"
        >
          <HiBars3 />
        </button>

        {/* Search */}
        <div className="hidden sm:flex items-center gap-2 flex-1 max-w-md glass rounded-xl px-3.5 py-2 focus-within:border-primary-500/40 transition-colors">
          <HiOutlineMagnifyingGlass className="text-ink-3 shrink-0" />
          <input
            type="text"
            placeholder="Search fields, crops, alerts…"
            className="w-full bg-transparent text-sm text-ink placeholder:text-ink-3 outline-none"
          />
          <kbd className="hidden md:block text-[10px] text-ink-3 border border-line rounded px-1.5 py-0.5">
            ⌘K
          </kbd>
        </div>
        <div className="flex-1 sm:hidden" />

        {/* Date · location · weather summary (progressively revealed) */}
        <div className="hidden xl:flex items-center gap-4 text-xs text-ink-2 pr-2">
          <span className="flex items-center gap-1.5">
            <HiOutlineCalendarDays className="text-base text-ink-3" />
            {today}
          </span>
          <span className="flex items-center gap-1.5">
            <HiOutlineMapPin className="text-base text-ink-3" />
            {currentWeather.location.split(',')[0]}
          </span>
          <span className="flex items-center gap-1.5 glass rounded-lg px-2.5 py-1.5">
            <HiOutlineCloud className="text-base text-accent-sky" />
            <span className="font-semibold text-ink">{currentWeather.temperature}°C</span>
            {currentWeather.condition}
          </span>
        </div>

        {/* Action cluster */}
        <div ref={menuRef} className="flex items-center gap-2 sm:gap-3">
          {/* Dark mode toggle */}
          <TopbarButton label={isDark ? 'Switch to light mode' : 'Switch to dark mode'} onClick={toggleTheme}>
            <motion.span
              key={isDark ? 'moon' : 'sun'}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="flex text-lg"
            >
              {isDark ? <HiOutlineSun /> : <HiOutlineMoon />}
            </motion.span>
          </TopbarButton>

          {/* Language selector */}
          <div className="relative hidden sm:block">
            <TopbarButton label="Change language" onClick={() => toggleMenu('language')} active={menu === 'language'}>
              <HiOutlineLanguage className="text-lg" />
            </TopbarButton>
            <Dropdown open={menu === 'language'} className="w-40">
              <ul className="p-1.5">
                {LANGUAGES.map((lang) => (
                  <li key={lang.code}>
                    <button
                      onClick={() => {
                        setLanguage(lang.code)
                        setMenu(null)
                      }}
                      className={classNames(
                        'w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer',
                        language === lang.code
                          ? 'bg-primary-500/15 text-primary-400 font-semibold'
                          : 'text-ink-2 hover:bg-surface-2 hover:text-ink',
                      )}
                    >
                      {lang.label}
                      <span className="text-[10px] text-ink-3">{lang.code}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </Dropdown>
          </div>

          {/* Messages */}
          <div className="relative hidden sm:block">
            <TopbarButton label="Messages" badge={unreadMessages} onClick={() => toggleMenu('messages')} active={menu === 'messages'}>
              <HiOutlineEnvelope className="text-lg" />
            </TopbarButton>
            <Dropdown open={menu === 'messages'} className="w-80">
              <p className="px-4 pt-3 pb-2 text-xs font-semibold uppercase tracking-widest text-ink-3">
                Messages
              </p>
              <ul className="pb-2 max-h-80 overflow-y-auto">
                {messages.map((message) => (
                  <li key={message.id}>
                    <button className="w-full text-left px-4 py-2.5 hover:bg-surface-2 transition-colors cursor-pointer">
                      <div className="flex items-center justify-between gap-2">
                        <p className={classNames('text-sm truncate', message.unread ? 'font-semibold text-ink' : 'text-ink-2')}>
                          {message.from}
                        </p>
                        <span className="text-[10px] text-ink-3 shrink-0">{message.time}</span>
                      </div>
                      <p className="text-xs text-ink-3 truncate mt-0.5">{message.preview}</p>
                    </button>
                  </li>
                ))}
              </ul>
            </Dropdown>
          </div>

          {/* Notifications → opens the right-hand drawer */}
          <TopbarButton label="Notifications" badge={unreadNotifications} onClick={toggleNotifications}>
            <HiOutlineBell className="text-lg" />
          </TopbarButton>

          {/* Profile dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleMenu('profile')}
              className="flex items-center gap-2.5 pl-1 cursor-pointer group"
              aria-label="Profile menu"
            >
              <div className="size-10 rounded-xl bg-gradient-to-br from-primary-500 to-emerald-700 flex items-center justify-center font-display font-bold text-white text-sm">
                {currentUser.initials}
              </div>
              <div className="hidden md:block leading-tight text-left">
                <p className="text-sm font-semibold text-ink">{currentUser.name}</p>
                <p className="text-xs text-ink-3">{currentUser.plan}</p>
              </div>
              <HiOutlineChevronDown
                className={classNames(
                  'hidden md:block text-ink-3 transition-transform',
                  menu === 'profile' && 'rotate-180',
                )}
              />
            </button>
            <Dropdown open={menu === 'profile'} className="w-56">
              <div className="px-4 py-3 border-b border-line">
                <p className="text-sm font-semibold text-ink">{currentUser.name}</p>
                <p className="text-xs text-ink-3">{currentUser.farm} · {currentUser.role}</p>
              </div>
              <ul className="p-1.5">
                <li>
                  <Link
                    to={ROUTES.SETTINGS}
                    onClick={() => setMenu(null)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-ink-2 hover:bg-surface-2 hover:text-ink transition-colors"
                  >
                    <HiOutlineUser className="text-base" /> My Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to={ROUTES.SETTINGS}
                    onClick={() => setMenu(null)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-ink-2 hover:bg-surface-2 hover:text-ink transition-colors"
                  >
                    <HiOutlineCog6Tooth className="text-base" /> Settings
                  </Link>
                </li>
                <li>
                  <Link
                    to={ROUTES.HOME}
                    onClick={() => setMenu(null)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-accent-rose hover:bg-accent-rose/10 transition-colors"
                  >
                    <HiOutlineArrowLeftOnRectangle className="text-base" /> Logout
                  </Link>
                </li>
              </ul>
            </Dropdown>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Topbar
