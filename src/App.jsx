import { BrowserRouter } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { ThemeProvider } from '@/context/ThemeContext.jsx'
import { AppProvider } from '@/context/AppContext.jsx'
import { ToastProvider } from '@/context/ToastContext.jsx'
import AppRoutes from '@/routes/AppRoutes.jsx'

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <AppProvider>
          <ToastProvider>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </ToastProvider>
        </AppProvider>
      </ThemeProvider>
    </MotionConfig>
  )
}

export default App
