'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

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
    // Check for touch device and reduced motion preference
    const isTouchDevice =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      // @ts-expect-error - msMaxTouchPoints is IE-specific
      navigator.msMaxTouchPoints > 0

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    // Only enable custom cursor on non-touch devices without reduced motion
    if (!isTouchDevice && !prefersReducedMotion) {
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

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    // Track hoverable elements
    const addHoverListeners = () => {
      const hoverables = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, [data-cursor-hover]'
      )

      hoverables.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHovering(true))
        el.addEventListener('mouseleave', () => setIsHovering(false))
      })
    }

    window.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    // Initial setup and observe for new elements
    addHoverListeners()

    const observer = new MutationObserver(() => {
      addHoverListeners()
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      observer.disconnect()
    }
  }, [isEnabled, cursorX, cursorY])

  if (!isEnabled) return null

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="bg-white rounded-full"
          animate={{
            width: isHovering ? 40 : 8,
            height: isHovering ? 40 : 8,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{
            type: 'spring',
            damping: 20,
            stiffness: 400,
          }}
        />
      </motion.div>

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="border-2 border-primary-500/50 rounded-full"
          animate={{
            width: isHovering ? 60 : 32,
            height: isHovering ? 60 : 32,
            opacity: isVisible ? 0.5 : 0,
          }}
          transition={{
            type: 'spring',
            damping: 15,
            stiffness: 200,
          }}
        />
      </motion.div>
    </>
  )
}

