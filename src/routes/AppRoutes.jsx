import { Suspense, lazy } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import MainLayout from '@/layouts/MainLayout.jsx'
import DashboardLayout from '@/layouts/DashboardLayout.jsx'
import Loader from '@/components/common/Loader.jsx'
import { ROUTES } from '@/utils/constants.js'

const Home             = lazy(() => import('@/pages/Home.jsx'))
const Dashboard        = lazy(() => import('@/pages/Dashboard.jsx'))
const DiseaseDetection = lazy(() => import('@/pages/DiseaseDetection.jsx'))
const Weather          = lazy(() => import('@/pages/Weather.jsx'))
const SoilAnalysis     = lazy(() => import('@/pages/SoilAnalysis.jsx'))
const Fertilizer       = lazy(() => import('@/pages/Fertilizer.jsx'))
const YieldPrediction  = lazy(() => import('@/pages/YieldPrediction.jsx'))
const DroneMonitoring  = lazy(() => import('@/pages/DroneMonitoring.jsx'))
const Satellite        = lazy(() => import('@/pages/Satellite.jsx'))
const Reports          = lazy(() => import('@/pages/Reports.jsx'))
const Marketplace      = lazy(() => import('@/pages/Marketplace.jsx'))
const Community        = lazy(() => import('@/pages/Community.jsx'))
const Settings         = lazy(() => import('@/pages/Settings.jsx'))
const NotFound         = lazy(() => import('@/pages/NotFound.jsx'))

function AppRoutes() {
  const location = useLocation()

  return (
    <Suspense fallback={<Loader label="Loading…" />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Public / marketing */}
          <Route element={<MainLayout />}>
            <Route path={ROUTES.HOME}      element={<Home />} />
            <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
          </Route>

          {/* App — dashboard shell */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index                       element={<Dashboard />} />
            <Route path="disease-detection"    element={<DiseaseDetection />} />
            <Route path="weather"              element={<Weather />} />
            <Route path="soil-analysis"        element={<SoilAnalysis />} />
            <Route path="fertilizer"           element={<Fertilizer />} />
            <Route path="yield-prediction"     element={<YieldPrediction />} />
            <Route path="drone-analytics"      element={<DroneMonitoring />} />
            <Route path="satellite"            element={<Satellite />} />
            <Route path="reports"              element={<Reports />} />
            <Route path="marketplace"          element={<Marketplace />} />
            <Route path="community"            element={<Community />} />
            <Route path="settings"             element={<Settings />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </Suspense>
  )
}

export default AppRoutes
