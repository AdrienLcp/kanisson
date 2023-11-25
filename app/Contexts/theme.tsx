'use client'

import React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [isMotionActive, setIsMotionActive] = React.useState<boolean>(false)

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const handleMotionPreferencesChange = () => {
      setIsMotionActive(!mediaQuery.matches)
    }
  
    mediaQuery.addEventListener('change', handleMotionPreferencesChange)
  
    return () => {
      mediaQuery.removeEventListener('change', handleMotionPreferencesChange)
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
