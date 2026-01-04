'use client'

import { useEffect } from 'react'

export default function TabTitle() {
  useEffect(() => {
    const originalTitle = 'Tooba Malik — Portfolio'

    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = "Don't leave 🙏😭"
      } else {
        document.title = originalTitle
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      document.title = originalTitle
    }
  }, [])

  return null
}

