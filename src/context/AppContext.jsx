import { createContext, useContext, useMemo, useState } from 'react'

/**
 * AppContext — global UI state for the dashboard shell.
 *
 *  - sidebarOpen      → mobile drawer visibility
 *  - sidebarCollapsed → desktop icon-only rail
 *  - notificationsOpen→ right-hand notification drawer
 *  - language         → active UI language (dummy, no i18n backend)
 *  - activeFarm       → currently selected farm
 */
const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [language, setLanguage] = useState('EN')
  const [activeFarm, setActiveFarm] = useState('greenfield-01')

  const value = useMemo(
    () => ({
      // Mobile sidebar drawer
      sidebarOpen,
      setSidebarOpen,
      toggleSidebar: () => setSidebarOpen((prev) => !prev),
      closeSidebar: () => setSidebarOpen(false),
      // Desktop sidebar collapse
      sidebarCollapsed,
      toggleCollapse: () => setSidebarCollapsed((prev) => !prev),
      // Notification drawer
      notificationsOpen,
      openNotifications: () => setNotificationsOpen(true),
      closeNotifications: () => setNotificationsOpen(false),
      toggleNotifications: () => setNotificationsOpen((prev) => !prev),
      // Language
      language,
      setLanguage,
      // Farm selection
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
