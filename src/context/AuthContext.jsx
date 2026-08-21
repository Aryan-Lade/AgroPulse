import { createContext, useContext, useState, useCallback, useMemo } from 'react'

const AuthContext = createContext(null)
function loadPersistedAuth() {
  try {
    const token = localStorage.getItem('agropulse_token')
    const user  = localStorage.getItem('agropulse_user')
    if (token && user) return { token, user: JSON.parse(user) }
  } catch {
  }
  return { token: null, user: null }
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(loadPersistedAuth)

  const login = useCallback((token, user) => {
    localStorage.setItem('agropulse_token', token)
    localStorage.setItem('agropulse_user', JSON.stringify(user))
    setAuth({ token, user })
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('agropulse_token')
    localStorage.removeItem('agropulse_user')
    setAuth({ token: null, user: null })
  }, [])

  const value = useMemo(() => ({
    user:       auth.user,
    token:      auth.token,
    isLoggedIn: Boolean(auth.token),
    login,
    logout,
  }), [auth, login, logout])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
