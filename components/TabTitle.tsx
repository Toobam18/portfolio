'use client'

import { useEffect } from 'react'

/** Swaps the tab title while the tab is hidden, then restores the page's own title. */
export default function TabTitle() {
  useEffect(() => {
    let savedTitle = document.title

    const handleVisibilityChange = () => {
      if (document.hidden) {
        savedTitle = document.title
        document.title = "Don't leave 🙏😭"
      } else {
        document.title = savedTitle
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  return null
}
