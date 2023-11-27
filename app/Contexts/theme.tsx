'use client'

import { createContext, useEffect, useState } from 'react'

import type { Theme } from '@/Types'
import { getStoredItem, storeItem } from '@/Helpers'
import { THEMES } from '@/Config'

type ThemeContext = {
  isDarkModeActive: boolean
  selectedTheme: Theme
  setTheme: (theme: Theme) => void
}

const PREFERS_DARK_COLOR_SCHEME = '(prefers-color-scheme: dark)'

export const ThemeContext = createContext<ThemeContext | null>(null)

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [selectedTheme, setSelectedTheme] = useState<Theme>('system')
  const [isDarkModeActive, setIsDarkModeActive] = useState<boolean>(true)

  const setTheme = (theme: Theme) => {
    if (THEMES.includes(theme)) {
      setSelectedTheme(theme)
      storeItem('theme', theme)

      switch (theme) {
        case 'dark':
          setIsDarkModeActive(true)
          break
        case 'light':
          setIsDarkModeActive(false)
          break
        case 'system':
        default:
          const matcher = window.matchMedia(PREFERS_DARK_COLOR_SCHEME)
          setIsDarkModeActive(matcher.matches)
          break
      }
    }
  }

  useEffect(() => {
    const matcher = window.matchMedia(PREFERS_DARK_COLOR_SCHEME)

    const handlePrefersColorSchemeChange = (event: MediaQueryListEvent) => {
      if (selectedTheme === 'system') {
        setIsDarkModeActive(event.matches)
      }
    }

    if (selectedTheme === 'system') {
      setIsDarkModeActive(matcher.matches)
      matcher.addEventListener('change', handlePrefersColorSchemeChange)
    } else {
      matcher.removeEventListener('change', handlePrefersColorSchemeChange)
    }

    return () => {
      matcher.removeEventListener('change', handlePrefersColorSchemeChange)
    }
  }, [selectedTheme])

  useEffect(() => {
    const storedTheme = getStoredItem<Theme>('theme')

    if (storedTheme) {
      setTheme(storedTheme)
    }
  }, [])

  return (
    <ThemeContext.Provider value={{ isDarkModeActive, selectedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
