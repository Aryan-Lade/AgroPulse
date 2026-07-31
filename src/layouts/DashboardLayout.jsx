import { Outlet } from 'react-router-dom'
import Sidebar from '../components/dashboard/Sidebar.jsx'
import Topbar from '../components/dashboard/Topbar.jsx'

function DashboardLayout() {
  return (
    <div className="min-h-screen bg-night-950 bg-mesh">
      <Sidebar />
      <div className="lg:pl-64 flex flex-col min-h-screen">
        <Topbar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
