import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from './context/AppContext.jsx'
import AppRoutes from './routes/AppRoutes.jsx'

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
