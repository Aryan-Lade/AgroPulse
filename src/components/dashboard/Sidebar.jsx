import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HiOutlineSquares2X2,
  HiOutlineBugAnt,
  HiOutlineCloud,
  HiOutlineBeaker,
  HiOutlineChartBar,
  HiOutlinePaperAirplane,
  HiOutlineArrowLeftOnRectangle,
} from 'react-icons/hi2'
import Logo from '../common/Logo.jsx'
import { useApp } from '../../context/AppContext.jsx'
import { ROUTES } from '../../utils/constants.js'
import { classNames } from '../../utils/formatters.js'

const menuItems = [
  { label: 'Overview', to: ROUTES.DASHBOARD, icon: HiOutlineSquares2X2, end: true },
  { label: 'Disease Detection', to: ROUTES.DISEASE, icon: HiOutlineBugAnt },
  { label: 'Weather', to: ROUTES.WEATHER, icon: HiOutlineCloud },
  { label: 'Soil Analysis', to: ROUTES.SOIL, icon: HiOutlineBeaker },
  { label: 'Yield Prediction', to: ROUTES.YIELD, icon: HiOutlineChartBar },
  { label: 'Drone Monitoring', to: ROUTES.DRONE, icon: HiOutlinePaperAirplane },
]

function SidebarContent({ onNavigate }) {
  return (
    <div className="flex flex-col h-full">
      <div className="px-5 py-5">
        <Logo size="sm" />
      </div>
      <nav className="flex-1 px-3 py-2 overflow-y-auto">
        <p className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-widest text-night-400">
          Modules
        </p>
        <ul className="flex flex-col gap-1">
          {menuItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                onClick={onNavigate}
                className={({ isActive }) =>
                  classNames(
                    'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                    isActive
                      ? 'bg-primary-500/15 text-primary-300 shadow-inner'
                      : 'text-night-300 hover:text-white hover:bg-white/5',
                  )
                }
              >
                <item.icon className="text-lg shrink-0" />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-3">
        <NavLink
          to={ROUTES.HOME}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-night-300 hover:text-white hover:bg-white/5 transition-colors"
        >
          <HiOutlineArrowLeftOnRectangle className="text-lg" />
          Back to Home
        </NavLink>
      </div>
    </div>
  )
}

function Sidebar() {
  const { sidebarOpen, closeSidebar } = useApp()

  return (
    <>
      <aside className="hidden lg:flex flex-col fixed inset-y-0 left-0 w-64 glass-strong border-y-0 border-l-0 rounded-none z-40">
        <SidebarContent />
      </aside>
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
              className="lg:hidden fixed inset-y-0 left-0 w-72 bg-night-900 border-r border-white/10 z-50"
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
