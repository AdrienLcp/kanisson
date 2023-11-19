'use client'

import { useEffect, useState } from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [isMotionActive, setIsMotionActive] = useState<boolean>(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const handleReducedMotionPreferencesChange = () => {
      setIsMotionActive(!mediaQuery.matches)
    }
  
    mediaQuery.addEventListener('change', handleReducedMotionPreferencesChange)
  
    return () => {
      mediaQuery.removeEventListener('change', handleReducedMotionPreferencesChange)
    }
  }, [])

  return (
    <NextThemesProvider 
      themes={['light', 'dark', 'sytem']}
      defaultTheme='system'
      attribute='class'
      enableSystem
      disableTransitionOnChange={!isMotionActive}
      enableColorScheme
    >
      {children}
    </NextThemesProvider>
  )
}
