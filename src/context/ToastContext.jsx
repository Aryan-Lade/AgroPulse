import { createContext, useCallback, useContext, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  HiOutlineCheckCircle,
  HiOutlineExclamationTriangle,
  HiOutlineXCircle,
  HiOutlineInformationCircle,
  HiOutlineXMark,
} from 'react-icons/hi2'
import { classNames } from '@/utils/formatters.js'
import { SPRING_SOFT } from '@/utils/motionVariants.js'

const ToastContext = createContext(null)

let _nextId = 0

const ICONS = {
  success: HiOutlineCheckCircle,
  warning: HiOutlineExclamationTriangle,
  error:   HiOutlineXCircle,
  info:    HiOutlineInformationCircle,
}

const STYLES = {
  success: 'border-primary-500/40 text-primary-300',
  warning: 'border-accent-amber/40 text-accent-amber',
  error:   'border-accent-rose/40 text-accent-rose',
  info:    'border-accent-sky/40 text-accent-sky',
}


function ToastItem({ id, type = 'info', title, message, onDismiss }) {
  const Icon = ICONS[type] ?? ICONS.info

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 80, scale: 0.95 }}
      animate={{ opacity: 1, x: 0,  scale: 1, transition: SPRING_SOFT }}
      exit={{ opacity: 0, x: 80, scale: 0.95, transition: { duration: 0.2 } }}
      className={classNames(
        'relative flex items-start gap-3 glass-card p-4 pr-10 max-w-sm w-full shadow-glass',
        'border',
        STYLES[type] ?? STYLES.info,
      )}
      role="alert"
      aria-live="polite"
    >
      <Icon className="text-xl shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        {title && <p className="text-sm font-semibold text-ink leading-tight">{title}</p>}
        {message && <p className="text-xs text-ink-2 mt-0.5 leading-relaxed">{message}</p>}
      </div>
      <button
        onClick={() => onDismiss(id)}
        className="absolute top-3 right-3 text-ink-3 hover:text-ink transition-colors cursor-pointer"
        aria-label="Dismiss"
      >
        <HiOutlineXMark className="text-base" />
      </button>
    </motion.div>
  )
}


export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const timers = useRef({})

  const dismiss = useCallback((id) => {
    clearTimeout(timers.current[id])
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const toast = useCallback(
    ({ type = 'info', title, message, duration = 4000 }) => {
      const id = ++_nextId
      setToasts((prev) => [...prev, { id, type, title, message }])
      if (duration > 0) {
        timers.current[id] = setTimeout(() => dismiss(id), duration)
      }
      return id
    },
    [dismiss],
  )

  toast.success = (title, message, opts) => toast({ type: 'success', title, message, ...opts })
  toast.error   = (title, message, opts) => toast({ type: 'error',   title, message, ...opts })
  toast.warning = (title, message, opts) => toast({ type: 'warning', title, message, ...opts })
  toast.info    = (title, message, opts) => toast({ type: 'info',    title, message, ...opts })

  return (
    <ToastContext.Provider value={toast}>
      {children}
      {}
      <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-3 items-end pointer-events-none">
        <AnimatePresence initial={false}>
          {toasts.map((t) => (
            <div key={t.id} className="pointer-events-auto">
              <ToastItem {...t} onDismiss={dismiss} />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}


export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>')
  return ctx
}
