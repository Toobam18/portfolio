import type { Variants } from 'framer-motion'

// Shared animation variants so every section enters the same way.
// Reduced motion is handled globally by <MotionConfig reducedMotion="user"> in ThemeProvider.

export const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
}
