/**
 * Motion design language — shared across the whole app.
 *
 * Principles (Apple / Linear / Stripe school):
 *  - One signature ease (`EASE`) so every entrance feels related.
 *  - Springs for interactive elements (hover, press, drawers) —
 *    physical, interruptible, never robotic.
 *  - Only GPU-friendly properties animate: transform + opacity
 *    (filter blur is used sparingly on small text nodes only).
 *  - Distances are small (8–32px); premium motion whispers.
 */

/** Signature ease-out — fast start, long soft landing. */
export const EASE = [0.22, 1, 0.36, 1]

/** Interactive spring — snappy but never bouncy. */
export const SPRING = { type: 'spring', stiffness: 380, damping: 30 }

/** Softer spring for larger surfaces (drawers, sheets, modals). */
export const SPRING_SOFT = { type: 'spring', stiffness: 300, damping: 32 }

/* ------------------------------------------------------------------ */
/*  Page transitions                                                   */
/* ------------------------------------------------------------------ */

/** Default route transition — fade + rise with a subtle scale settle. */
export const pageTransition = {
  initial: { opacity: 0, y: 12, scale: 0.995 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: EASE },
  },
  exit: {
    opacity: 0,
    y: -8,
    scale: 0.995,
    transition: { duration: 0.22, ease: [0.4, 0, 1, 1] },
  },
}

/** Alternative route transition — pure fade + scale (used by modules). */
export const pageFadeScale = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: EASE } },
  exit: { opacity: 0, scale: 0.99, transition: { duration: 0.2, ease: [0.4, 0, 1, 1] } },
}

/* ------------------------------------------------------------------ */
/*  Entrance variants (scroll reveal + stagger children)               */
/* ------------------------------------------------------------------ */

export const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: EASE },
  }),
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
}

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.08 },
  },
}

/** Faster stagger for dense grids (KPI strips, action grids). */
export const staggerContainerFast = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.04 },
  },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
}

export const slideInLeft = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: EASE },
  },
}

export const slideInRight = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: EASE },
  },
}

/* ------------------------------------------------------------------ */
/*  Text reveal — per-word rise + blur clear (hero headlines)          */
/* ------------------------------------------------------------------ */

export const textRevealContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.045, delayChildren: 0.1 },
  },
}

export const textRevealWord = {
  hidden: { opacity: 0, y: '0.6em', filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: EASE },
  },
}

/* ------------------------------------------------------------------ */
/*  Overlay surfaces (modals, drawers, dropdowns, toasts)              */
/* ------------------------------------------------------------------ */

export const modalOverlay = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25, ease: 'easeOut' } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } },
}

export const modalPanel = {
  hidden: { opacity: 0, scale: 0.95, y: 16 },
  visible: { opacity: 1, scale: 1, y: 0, transition: SPRING_SOFT },
  exit: {
    opacity: 0,
    scale: 0.97,
    y: 8,
    transition: { duration: 0.18, ease: [0.4, 0, 1, 1] },
  },
}

export const dropdownMenu = {
  hidden: { opacity: 0, y: 8, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.18, ease: EASE } },
  exit: { opacity: 0, y: 6, scale: 0.98, transition: { duration: 0.14, ease: [0.4, 0, 1, 1] } },
}

/** Notification / toast — slide in from the right with a soft spring. */
export const notificationItem = {
  hidden: { opacity: 0, x: 32, scale: 0.97 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { ...SPRING_SOFT, delay: i * 0.05 },
  }),
  exit: { opacity: 0, x: 24, transition: { duration: 0.18 } },
}

/* ------------------------------------------------------------------ */
/*  Interaction presets                                                */
/* ------------------------------------------------------------------ */

/** Card hover — lift with spring; pairs with a CSS shadow transition. */
export const cardHover = {
  whileHover: { y: -5, transition: SPRING },
}

/** Icon micro-bounce on hover. */
export const iconHover = {
  whileHover: { scale: 1.12, rotate: 3, transition: SPRING },
}
