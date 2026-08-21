import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HiOutlineBell,
  HiOutlineCloud,
  HiOutlineBugAnt,
  HiOutlineBeaker,
  HiOutlineShoppingBag,
  HiOutlineCog6Tooth,
  HiOutlineChartBar,
  HiOutlineCheckCircle,
  HiOutlineInbox,
} from 'react-icons/hi2'
import PageWrapper from '@/components/common/PageWrapper.jsx'
import PageHeader from '@/components/common/PageHeader.jsx'
import Badge from '@/components/common/Badge.jsx'
import { classNames } from '@/utils/formatters.js'
import { fadeInUp, staggerContainer } from '@/utils/motionVariants.js'
import notificationsData from '@/data/notifications.json'

function getCategoryIcon(category) {
  switch (category) {
    case 'weather':    return HiOutlineCloud
    case 'disease':    return HiOutlineBugAnt
    case 'pest':       return HiOutlineBugAnt
    case 'soil':       return HiOutlineBeaker
    case 'market':     return HiOutlineShoppingBag
    case 'yield':      return HiOutlineChartBar
    case 'government': return HiOutlineCog6Tooth
    case 'insurance':  return HiOutlineCog6Tooth
    case 'drone':      return HiOutlineChartBar
    default:           return HiOutlineCog6Tooth
  }
}

function priorityToStatus(priority) {
  switch (priority) {
    case 'critical': return 'critical'
    case 'high':     return 'warning'
    case 'medium':   return 'info'
    case 'low':      return 'optimal'
    default:         return 'neutral'
  }
}

function relativeTime(timestamp) {
  const now = new Date('2026-08-12T06:15:19.703Z')
  const diff = Math.floor((now - new Date(timestamp)) / 1000)
  if (diff < 60)   return 'Just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

const TABS = [
  { id: 'all',     label: 'All' },
  { id: 'unread',  label: 'Unread' },
  { id: 'weather', label: 'Weather' },
  { id: 'disease', label: 'Disease' },
  { id: 'soil',    label: 'Soil' },
  { id: 'market',  label: 'Market' },
  { id: 'system',  label: 'System' },
]

const TAB_CATEGORY_MAP = {
  all:     null,
  unread:  null,
  weather: ['weather'],
  disease: ['disease', 'pest'],
  soil:    ['soil'],
  market:  ['market'],
  system:  ['government', 'insurance', 'drone'],
}

function NotificationItem({ item, onToggleRead, index }) {
  const Icon = getCategoryIcon(item.category)
  const badgeStatus = priorityToStatus(item.priority)

  return (
    <motion.li
      layout
      variants={fadeInUp}
      custom={index}
      exit={{ opacity: 0, x: 24, transition: { duration: 0.18 } }}
      onClick={() => onToggleRead(item.id)}
      className={classNames(
        'group flex items-start gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-200',
        'border hover:shadow-lg hover:-translate-y-0.5',
        item.isRead
          ? 'glass border-transparent hover:border-line'
          : 'glass-card border-primary-500/20 bg-primary-500/5 hover:border-primary-500/40',
      )}
    >
      {}
      <span className={classNames(
        'shrink-0 size-10 rounded-xl flex items-center justify-center text-lg transition-colors',
        item.isRead
          ? 'bg-surface-2 text-ink-3 group-hover:text-ink-2'
          : 'bg-primary-500/15 text-primary-400',
      )}>
        <Icon />
      </span>

      {}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-0.5">
          <p className={classNames(
            'text-sm font-semibold leading-snug',
            item.isRead ? 'text-ink-2' : 'text-ink',
          )}>
            {item.title}
          </p>
          {}
          {!item.isRead && (
            <span className="shrink-0 size-2 rounded-full bg-primary-500 mt-1.5" />
          )}
        </div>
        <p className="text-xs text-ink-3 leading-relaxed line-clamp-2 mb-2">{item.message}</p>
        <div className="flex items-center gap-2 flex-wrap">
          <Badge status={badgeStatus}>{item.priority}</Badge>
          <span className="text-xs text-ink-3">{relativeTime(item.timestamp)}</span>
        </div>
      </div>
    </motion.li>
  )
}

function EmptyState({ tab }) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center py-20 gap-4 text-center"
    >
      <span className="size-16 rounded-2xl bg-surface-2 flex items-center justify-center text-3xl text-ink-3">
        <HiOutlineInbox />
      </span>
      <div>
        <p className="font-semibold text-ink-2 mb-1">No notifications here</p>
        <p className="text-sm text-ink-3">
          {tab === 'unread' ? "You're all caught up!" : `No ${tab} notifications right now.`}
        </p>
      </div>
    </motion.div>
  )
}

function Notifications() {
  const [activeTab, setActiveTab] = useState('all')
  const [items, setItems] = useState(notificationsData.data)

  const unreadCount = items.filter((n) => !n.isRead).length

  const filtered = useMemo(() => {
    if (activeTab === 'unread') return items.filter((n) => !n.isRead)
    const cats = TAB_CATEGORY_MAP[activeTab]
    if (!cats) return items
    return items.filter((n) => cats.includes(n.category))
  }, [items, activeTab])

  const markAllRead = () => setItems((prev) => prev.map((n) => ({ ...n, isRead: true })))

  const toggleRead = (id) =>
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: !n.isRead } : n)))

  return (
    <PageWrapper>
      <PageHeader
        icon={HiOutlineBell}
        accent="primary"
        title="Notifications"
        description="Stay updated with alerts, insights, and AI-powered recommendations for your farm."
        action={
          unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium glass hover:glass-card text-ink-2 hover:text-primary-400 border border-transparent hover:border-primary-500/30 transition-all duration-200 cursor-pointer"
            >
              <HiOutlineCheckCircle className="text-lg" />
              Mark all read
            </button>
          )
        }
      />

      {}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="flex items-center gap-3 mb-5"
      >
        <span className="text-sm text-ink-2">
          <span className="font-semibold text-ink">{items.length}</span> total
        </span>
        <span className="text-ink-3">·</span>
        <span className="text-sm text-ink-2">
          <span className="font-semibold text-primary-400">{unreadCount}</span> unread
        </span>
      </motion.div>

      {}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="flex items-center gap-1.5 flex-wrap mb-6"
      >
        {TABS.map((tab) => {
          const count =
            tab.id === 'unread'
              ? items.filter((n) => !n.isRead).length
              : tab.id === 'all'
              ? items.length
              : items.filter((n) => (TAB_CATEGORY_MAP[tab.id] ?? []).includes(n.category)).length

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={classNames(
                'relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer border',
                activeTab === tab.id
                  ? 'bg-primary-500/15 text-primary-300 border-primary-500/40 shadow-inner'
                  : 'glass text-ink-2 hover:text-ink border-transparent hover:border-line',
              )}
            >
              {tab.label}
              {count > 0 && (
                <span className={classNames(
                  'inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold',
                  activeTab === tab.id
                    ? 'bg-primary-500/30 text-primary-200'
                    : 'bg-surface-2 text-ink-3',
                )}>
                  {count}
                </span>
              )}
              {activeTab === tab.id && (
                <motion.span
                  layoutId="notif-tab-indicator"
                  className="absolute inset-0 rounded-xl bg-primary-500/10"
                  style={{ zIndex: -1 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
            </button>
          )
        })}
      </motion.div>

      {}
      {filtered.length === 0 ? (
        <EmptyState tab={activeTab} />
      ) : (
        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-2"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, index) => (
              <NotificationItem
                key={item.id}
                item={item}
                index={index}
                onToggleRead={toggleRead}
              />
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </PageWrapper>
  )
}

export default Notifications
