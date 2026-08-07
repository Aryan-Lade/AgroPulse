import { BrowserRouter } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { AppProvider } from './context/AppContext.jsx'
import AppRoutes from './routes/AppRoutes.jsx'

function App() {
  return (
    // reducedMotion="user" — every framer-motion transform animation is
    // automatically disabled for users with prefers-reduced-motion set.
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <AppProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AppProvider>
      </ThemeProvider>
    </MotionConfig>
  )
}

export default App
