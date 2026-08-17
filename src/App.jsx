import { BrowserRouter } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { ThemeProvider } from '@/context/ThemeContext.jsx'
import { AppProvider } from '@/context/AppContext.jsx'
import { ToastProvider } from '@/context/ToastContext.jsx'
import { AuthProvider } from '@/context/AuthContext.jsx'
import AppRoutes from '@/routes/AppRoutes.jsx'

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <AuthProvider>
          <AppProvider>
            <ToastProvider>
              <BrowserRouter>
                <AppRoutes />
              </BrowserRouter>
            </ToastProvider>
          </AppProvider>
        </AuthProvider>
      </ThemeProvider>
    </MotionConfig>
  )
}

export default App
