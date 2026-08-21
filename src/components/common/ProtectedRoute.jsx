import { Navigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext.jsx'
import { ROUTES } from '@/utils/constants.js'


function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth()
  if (!isLoggedIn) return <Navigate to={ROUTES.LOGIN} replace />
  return children
}

export default ProtectedRoute
