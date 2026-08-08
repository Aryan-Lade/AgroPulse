import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineXMark } from 'react-icons/hi2'
import { modalOverlay, modalPanel } from '../../utils/motionVariants.js'
import { classNames } from '../../utils/formatters.js'

/**
 * Modal — scale-in panel over a blurred backdrop.
 * Closes on backdrop click and Escape; the exit animation runs fully
 * before unmount via AnimatePresence.
 */
function Modal({ open, onClose, title, children, className }) {
  useEffect(() => {
    if (!open) return undefined
    const handleKey = (event) => {
      if (event.key === 'Escape') onClose?.()
    }
    document.addEventListener('keydown', handleKey)
    // Lock body scroll while open
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = previous
    }
  }, [open, onClose])

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6">
          {/* Blurred backdrop */}
          <motion.div
            variants={modalOverlay}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="absolute inset-0 bg-night-950/60 backdrop-blur-md"
          />
          {/* Panel */}
          <motion.div
            variants={modalPanel}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className={classNames(
              'relative w-full max-w-lg glass-strong rounded-2xl shadow-glass overflow-hidden',
              className,
            )}
          >
            {title && (
              <div className="flex items-center justify-between px-5 py-4 border-b border-line">
                <h2 className="font-display font-semibold text-ink">{title}</h2>
                <button
                  onClick={onClose}
                  aria-label="Close dialog"
                  className="size-8 rounded-lg glass flex items-center justify-center text-ink-2 hover:text-ink transition-colors cursor-pointer"
                >
                  <HiOutlineXMark className="text-lg" />
                </button>
              </div>
            )}
            <div className="p-5">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

export default Modal
