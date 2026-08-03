import { Outlet } from 'react-router-dom'
import Sidebar from '../components/dashboard/Sidebar.jsx'
import Topbar from '../components/dashboard/Topbar.jsx'
import NotificationDrawer from '../components/dashboard/NotificationDrawer.jsx'
import { useApp } from '../context/AppContext.jsx'

/**
 * DashboardLayout — application shell:
 * collapsible sidebar rail · sticky topbar · main scroll area ·
 * right-side notification drawer (overlay).
 * The left padding animates in sync with the sidebar width (CSS var + transition).
 */
function DashboardLayout() {
  const { sidebarCollapsed } = useApp()

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
            <Outlet />
          </div>
        </main>
      </div>
      <NotificationDrawer />
    </div>
  )
}

export default DashboardLayout
