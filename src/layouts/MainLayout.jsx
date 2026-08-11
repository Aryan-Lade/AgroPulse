import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from '../components/common/Navbar.jsx'
import Footer from '../components/common/Footer.jsx'

function MainLayout() {
  const location = useLocation()

  return (
    <div className="force-dark min-h-screen bg-night-950 bg-mesh flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <AnimatePresence mode="wait" initial={false}>
          <Outlet key={location.pathname} />
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
