import { NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HiOutlineSquares2X2,
  HiOutlineBugAnt,
  HiOutlineCloud,
  HiOutlineBeaker,
  HiOutlineSparkles,
  HiOutlineChartBar,
  HiOutlinePaperAirplane,
  HiOutlineGlobeAmericas,
  HiOutlineDocumentChartBar,
  HiOutlineShoppingBag,
  HiOutlineUserGroup,
  HiOutlineCog6Tooth,
  HiOutlineBell,
  HiOutlineSpeakerWave,
  HiOutlineArrowLeftOnRectangle,
  HiOutlineChevronDoubleLeft,
} from 'react-icons/hi2'
import Logo from '../common/Logo.jsx'
import { useApp } from '@/context/AppContext.jsx'
import { useAuth } from '@/context/AuthContext.jsx'
import { ROUTES } from '../../utils/constants.js'
import { classNames } from '../../utils/formatters.js'

/** Sidebar navigation model — icon + label per module route. */
const menuItems = [
  { label: 'Dashboard', to: ROUTES.DASHBOARD, icon: HiOutlineSquares2X2, end: true },
  { label: 'Disease Detection', to: ROUTES.DISEASE, icon: HiOutlineBugAnt },
  { label: 'Weather Intelligence', to: ROUTES.WEATHER, icon: HiOutlineCloud },
  { label: 'Soil Analysis', to: ROUTES.SOIL, icon: HiOutlineBeaker },
  { label: 'Fertilizer Recommendation', to: ROUTES.FERTILIZER, icon: HiOutlineSparkles },
  { label: 'Yield Prediction', to: ROUTES.YIELD, icon: HiOutlineChartBar },
  { label: 'Drone Analytics', to: ROUTES.DRONE, icon: HiOutlinePaperAirplane },
  { label: 'Satellite Monitoring', to: ROUTES.SATELLITE, icon: HiOutlineGlobeAmericas },
  { label: 'Reports', to: ROUTES.REPORTS, icon: HiOutlineDocumentChartBar },
  { label: 'Marketplace', to: ROUTES.MARKETPLACE, icon: HiOutlineShoppingBag },
  { label: 'Community', to: ROUTES.COMMUNITY, icon: HiOutlineUserGroup },
  { label: 'Settings', to: ROUTES.SETTINGS, icon: HiOutlineCog6Tooth },
  { label: 'Notifications', to: ROUTES.NOTIFICATIONS, icon: HiOutlineBell },
  { label: 'Voice Assistant', to: ROUTES.VOICE, icon: HiOutlineSpeakerWave },
]

/** Single nav row. Shows a floating tooltip when the rail is collapsed. */
function SidebarLink({ item, collapsed, onNavigate }) {
  return (
    <NavLink
      to={item.to}
      end={item.end}
      onClick={onNavigate}
      title={collapsed ? undefined : item.label}
      className={({ isActive }) =>
        classNames(
          'group/link relative flex items-center gap-3 rounded-xl text-sm font-medium transition-all duration-200',
          collapsed ? 'justify-center px-0 py-2.5' : 'px-3 py-2.5',
          isActive
            ? 'bg-primary-500/15 text-primary-400 shadow-inner'
            : 'text-ink-2 hover:text-ink hover:bg-surface-2 hover:translate-x-0.5',
        )
      }
    >
      {({ isActive }) => (
        <>
          {/* Active route indicator — shared layout element glides
              between rows with a spring when the selection changes */}
          {isActive && (
            <motion.span
              layoutId="sidebar-active"
              transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full bg-primary-500"
            />
          )}
          <motion.span
            whileHover={{ scale: 1.15, rotate: isActive ? 0 : 4 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 22 }}
            className="flex shrink-0"
          >
            <item.icon className="text-xl" />
          </motion.span>
          {/* Label fades + slides while the rail width animates */}
          <AnimatePresence initial={false}>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="truncate"
              >
                {item.label}
              </motion.span>
            )}
          </AnimatePresence>
          {/* Tooltip — only rendered while collapsed */}
          {collapsed && (
            <span className="pointer-events-none absolute left-full ml-3 z-50 whitespace-nowrap rounded-lg glass-strong px-3 py-1.5 text-xs font-medium text-ink opacity-0 -translate-x-1 transition-all duration-200 group-hover/link:opacity-100 group-hover/link:translate-x-0">
              {item.label}
            </span>
          )}
        </>
      )}
    </NavLink>
  )
}

/** Shared content used by both the desktop rail and the mobile drawer. */
function SidebarContent({ collapsed = false, onNavigate }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : '?'

  const handleLogout = () => {
    logout()
    onNavigate?.()
    navigate(ROUTES.HOME, { replace: true })
  }

  return (
    <div className="flex flex-col h-full">
      <div className={classNames('py-5', collapsed ? 'px-2 flex justify-center' : 'px-5')}>
        <Logo size="sm" compact={collapsed} />
      </div>

      <nav className="flex-1 px-3 py-2 overflow-y-auto overflow-x-visible">
        {!collapsed && (
          <p className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-widest text-ink-3">
            Modules
          </p>
        )}
        <ul className="flex flex-col gap-1">
          {menuItems.map((item, index) => (
            <motion.li
              key={item.to}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.04 * index, duration: 0.3, ease: 'easeOut' }}
            >
              <SidebarLink item={item} collapsed={collapsed} onNavigate={onNavigate} />
            </motion.li>
          ))}
        </ul>
      </nav>

      {/* User profile + logout pinned to the bottom */}
      <div className={classNames('border-t border-line p-3', collapsed && 'flex flex-col items-center gap-1')}>
        <div
          className={classNames(
            'flex items-center gap-3 rounded-xl px-2 py-2',
            collapsed && 'justify-center px-0',
          )}
        >
          <div className="size-9 shrink-0 rounded-xl bg-gradient-to-br from-primary-500 to-emerald-700 flex items-center justify-center font-display font-bold text-white text-xs">
            {initials}
          </div>
          {!collapsed && (
            <div className="min-w-0 leading-tight">
              <p className="text-sm font-semibold text-ink truncate">{user?.name ?? 'User'}</p>
              <p className="text-xs text-ink-3 truncate">{user?.email ?? ''}</p>
            </div>
          )}
        </div>
        <button
          onClick={handleLogout}
          className={classNames(
            'group/link relative flex items-center gap-3 rounded-xl text-sm font-medium text-ink-2 hover:text-accent-rose hover:bg-accent-rose/10 transition-colors cursor-pointer',
            collapsed ? 'justify-center px-0 py-2.5 w-full' : 'px-3 py-2.5 w-full',
          )}
        >
          <HiOutlineArrowLeftOnRectangle className="text-xl shrink-0" />
          {!collapsed && 'Logout'}
          {collapsed && (
            <span className="pointer-events-none absolute left-full ml-3 z-50 whitespace-nowrap rounded-lg glass-strong px-3 py-1.5 text-xs font-medium text-ink opacity-0 -translate-x-1 transition-all duration-200 group-hover/link:opacity-100 group-hover/link:translate-x-0">
              Logout
            </span>
          )}
        </button>
      </div>
    </div>
  )
}

/**
 * Sidebar — desktop: fixed rail with smooth width collapse (72px ↔ 264px);
 * mobile: spring-animated overlay drawer.
 */
function Sidebar() {
  const { sidebarOpen, closeSidebar, sidebarCollapsed, toggleCollapse } = useApp()

  return (
    <>
      {/* Desktop rail */}
      <motion.aside
        animate={{ width: sidebarCollapsed ? 72 : 264 }}
        transition={{ type: 'spring', stiffness: 300, damping: 34 }}
        className="hidden lg:flex flex-col fixed inset-y-0 left-0 glass-strong border-y-0 border-l-0 rounded-none z-40"
      >
        <SidebarContent collapsed={sidebarCollapsed} />
        {/* Collapse handle */}
        <motion.button
          onClick={toggleCollapse}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="absolute -right-3 top-20 size-6 rounded-full glass-strong flex items-center justify-center text-ink-2 hover:text-primary-400 transition-colors cursor-pointer"
        >
          <motion.span
            animate={{ rotate: sidebarCollapsed ? 180 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className="flex"
          >
            <HiOutlineChevronDoubleLeft className="text-xs" />
          </motion.span>
        </motion.button>
      </motion.aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeSidebar}
              className="lg:hidden fixed inset-0 bg-night-950/70 backdrop-blur-sm z-40"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="lg:hidden fixed inset-y-0 left-0 w-72 bg-canvas border-r border-line z-50"
            >
              <SidebarContent onNavigate={closeSidebar} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Sidebar
