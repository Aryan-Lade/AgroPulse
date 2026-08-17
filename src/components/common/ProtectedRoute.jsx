import { Navigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext.jsx'
import { ROUTES } from '@/utils/constants.js'

/**
 * Wrap any route that requires a logged-in user.
 * Redirects to /login if no valid session is found.
 */
function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth()
  if (!isLoggedIn) return <Navigate to={ROUTES.LOGIN} replace />
  return children
}

export default ProtectedRoute
