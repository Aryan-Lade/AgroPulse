import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineXMark, HiOutlineBellAlert, HiOutlineCheckCircle } from 'react-icons/hi2'
import Badge from '../common/Badge.jsx'
import { useApp } from '@/context/AppContext.jsx'
import { notifications } from '../../data/dashboardData.js'
import { classNames } from '../../utils/formatters.js'


function NotificationDrawer() {
  const { notificationsOpen, closeNotifications } = useApp()

  return (
    <AnimatePresence>
      {notificationsOpen && (
        <>
          {}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeNotifications}
            className="fixed inset-0 bg-night-950/60 backdrop-blur-sm z-50"
          />
          {}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 320 }}
            className="fixed inset-y-0 right-0 w-full max-w-sm bg-canvas border-l border-line z-50 flex flex-col"
            role="dialog"
            aria-label="Notifications"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-line">
              <div className="flex items-center gap-2.5">
                <span className="size-9 rounded-xl bg-primary-500/15 flex items-center justify-center text-primary-400">
                  <HiOutlineBellAlert className="text-lg" />
                </span>
                <div>
                  <h2 className="font-display font-semibold text-ink text-sm">Notifications</h2>
                  <p className="text-xs text-ink-3">
                    {notifications.filter((n) => n.unread).length} unread
                  </p>
                </div>
              </div>
              <button
                onClick={closeNotifications}
                aria-label="Close notifications"
                className="size-9 rounded-xl glass flex items-center justify-center text-ink-2 hover:text-ink transition-colors cursor-pointer"
              >
                <HiOutlineXMark className="text-lg" />
              </button>
            </div>

            <ul className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
              {notifications.map((item, index) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className={classNames(
                    'glass rounded-xl p-4',
                    item.unread && 'border-primary-500/25',
                  )}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <Badge status={item.severity}>{item.severity}</Badge>
                    <span className="text-[11px] text-ink-3 shrink-0">{item.time}</span>
                  </div>
                  <p className="text-sm font-semibold text-ink">{item.title}</p>
                  <p className="text-xs text-ink-2 mt-0.5 leading-relaxed">{item.detail}</p>
                </motion.li>
              ))}
            </ul>

            <div className="p-4 border-t border-line">
              <button className="w-full flex items-center justify-center gap-2 rounded-xl glass px-4 py-2.5 text-sm font-medium text-primary-400 hover:bg-primary-500/10 transition-colors cursor-pointer">
                <HiOutlineCheckCircle className="text-base" />
                Mark all as read
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

export default NotificationDrawer
