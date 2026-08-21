import { createContext, useContext, useMemo, useState } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [language, setLanguage] = useState('EN')
  const [activeFarm, setActiveFarm] = useState('greenfield-01')

  const value = useMemo(
    () => ({
      sidebarOpen,
      setSidebarOpen,
      toggleSidebar: () => setSidebarOpen((prev) => !prev),
      closeSidebar: () => setSidebarOpen(false),
      sidebarCollapsed,
      toggleCollapse: () => setSidebarCollapsed((prev) => !prev),
      notificationsOpen,
      openNotifications: () => setNotificationsOpen(true),
      closeNotifications: () => setNotificationsOpen(false),
      toggleNotifications: () => setNotificationsOpen((prev) => !prev),
      language,
      setLanguage,
      activeFarm,
      setActiveFarm,
    }),
    [sidebarOpen, sidebarCollapsed, notificationsOpen, language, activeFarm],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
