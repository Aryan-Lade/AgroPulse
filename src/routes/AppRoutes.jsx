import { Suspense, lazy } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import MainLayout from '../layouts/MainLayout.jsx'
import DashboardLayout from '../layouts/DashboardLayout.jsx'
import Loader from '../components/common/Loader.jsx'
import { ROUTES } from '../utils/constants.js'

const Home = lazy(() => import('../pages/Home.jsx'))
const Dashboard = lazy(() => import('../pages/Dashboard.jsx'))
const DiseaseDetection = lazy(() => import('../pages/DiseaseDetection.jsx'))
const Weather = lazy(() => import('../pages/Weather.jsx'))
const SoilAnalysis = lazy(() => import('../pages/SoilAnalysis.jsx'))
const YieldPrediction = lazy(() => import('../pages/YieldPrediction.jsx'))
const DroneMonitoring = lazy(() => import('../pages/DroneMonitoring.jsx'))
const NotFound = lazy(() => import('../pages/NotFound.jsx'))

function AppRoutes() {
  const location = useLocation()

  return (
    <Suspense fallback={<Loader label="Preparing your farm" />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route element={<MainLayout />}>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
          </Route>
          <Route path={ROUTES.DASHBOARD} element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="disease-detection" element={<DiseaseDetection />} />
            <Route path="weather" element={<Weather />} />
            <Route path="soil-analysis" element={<SoilAnalysis />} />
            <Route path="yield-prediction" element={<YieldPrediction />} />
            <Route path="drone-monitoring" element={<DroneMonitoring />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </Suspense>
  )
}

export default AppRoutes
