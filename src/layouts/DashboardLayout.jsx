import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Sidebar from '../components/dashboard/Sidebar.jsx'
import Topbar from '../components/dashboard/Topbar.jsx'
import NotificationDrawer from '../components/dashboard/NotificationDrawer.jsx'
import { useApp } from '../context/AppContext.jsx'
function DashboardLayout() {
  const { sidebarCollapsed } = useApp()
  const location = useLocation()

  return (
    <div className="min-h-screen bg-canvas bg-mesh">
      <Sidebar />
      <div
        className="flex flex-col min-h-screen transition-[padding-left] duration-300 ease-out lg:pl-(--rail)"
        style={{ '--rail': sidebarCollapsed ? '72px' : '264px' }}
      >
        <Topbar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-[1600px] mx-auto">
            <AnimatePresence mode="wait" initial={false}>
              {}
              <Outlet key={location.pathname} />
            </AnimatePresence>
          </div>
        </main>
      </div>
      <NotificationDrawer />
    </div>
  )
}

export default DashboardLayout
