'use client'

import { MotionConfig } from 'framer-motion'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      {/* Skips transform and layout animations for visitors who prefer reduced motion */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </NextThemesProvider>
  )
}
