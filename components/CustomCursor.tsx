'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const HOVERABLE = 'a, button, [role="button"], input, textarea, select, [data-cursor-hover]'

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isEnabled, setIsEnabled] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 400 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    // Only on devices with a precise pointer, and never for visitors who prefer reduced motion
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (finePointer && !prefersReducedMotion) {
      setIsEnabled(true)
      document.body.classList.add('custom-cursor-active')
    }

    return () => {
      document.body.classList.remove('custom-cursor-active')
    }
  }, [])

  useEffect(() => {
    if (!isEnabled) return

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      setIsVisible(true)
    }
    // One delegated listener instead of a listener per element, so new elements work automatically
    const handleOver = (e: MouseEvent) => {
      const target = e.target as Element | null
      setIsHovering(Boolean(target?.closest?.(HOVERABLE)))
    }
    const handleLeave = () => setIsVisible(false)
    const handleEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', moveCursor, { passive: true })
    document.addEventListener('mouseover', handleOver, { passive: true })
    document.addEventListener('mouseleave', handleLeave)
    document.addEventListener('mouseenter', handleEnter)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseover', handleOver)
      document.removeEventListener('mouseleave', handleLeave)
      document.removeEventListener('mouseenter', handleEnter)
    }
  }, [isEnabled, cursorX, cursorY])

  if (!isEnabled) return null

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: cursorXSpring, y: cursorYSpring, translateX: '-50%', translateY: '-50%' }}
      >
        <motion.div
          className="bg-white rounded-full"
          animate={{ width: isHovering ? 40 : 8, height: isHovering ? 40 : 8, opacity: isVisible ? 1 : 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 400 }}
        />
      </motion.div>

      {/* Outer ring */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{ x: cursorXSpring, y: cursorYSpring, translateX: '-50%', translateY: '-50%' }}
      >
        <motion.div
          className="border-2 border-primary-500/50 rounded-full"
          animate={{ width: isHovering ? 60 : 32, height: isHovering ? 60 : 32, opacity: isVisible ? 0.5 : 0 }}
          transition={{ type: 'spring', damping: 15, stiffness: 200 }}
        />
      </motion.div>
    </>
  )
}
