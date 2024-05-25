'use client'

import React from 'react'

import { useProvidedContext } from '@/helpers/contexts'
import { getStoredItem, storeItem } from '@/helpers/local-storage'

const PREFERS_DARK_COLOR_SCHEME = '(prefers-color-scheme: dark)'

// Theme light name need to match with 'light' class name used in src/styles/colors.sass
export const THEMES = ['dark', 'light', 'system'] as const
export type Theme = typeof THEMES[number]

export const isTheme = (theme: string): theme is Theme => {
  return THEMES.includes(theme as Theme)
}

type ThemeContextValue = {
  changeTheme: (newTheme: Theme) => void
  currentTheme: Theme
  isDarkModeActive: boolean
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null)

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = React.useState<Theme>('system')
  const [isDarkModeActive, setIsDarkModeActive] = React.useState<boolean>(true)

  const changeTheme = React.useCallback((newTheme: Theme) => {
    if (!isTheme(newTheme)) {
      return
    }

    setCurrentTheme(newTheme)
    storeItem('theme', newTheme)

    if (currentTheme === 'system') {
      const matcher = window.matchMedia(PREFERS_DARK_COLOR_SCHEME)
      setIsDarkModeActive(matcher.matches)
      return
    }

    setIsDarkModeActive(newTheme === 'dark')
  }, [currentTheme])

  React.useEffect(() => {
    const handlePrefersColorSchemeChange = (event: MediaQueryListEvent) => {
      if (currentTheme === 'system') {
        setIsDarkModeActive(event.matches)
      }
    }

    const matcher = window.matchMedia(PREFERS_DARK_COLOR_SCHEME)

    if (currentTheme === 'system') {
      setIsDarkModeActive(matcher.matches)
      matcher.addEventListener('change', handlePrefersColorSchemeChange)
    } else {
      matcher.removeEventListener('change', handlePrefersColorSchemeChange)
    }

    return () => {
      matcher.removeEventListener('change', handlePrefersColorSchemeChange)
    }
  }, [currentTheme])

  React.useEffect(() => {
    const storedTheme = getStoredItem('theme')

    if (storedTheme !== undefined) {
      changeTheme(storedTheme)
    }
  }, [changeTheme])

  return (
    <ThemeContext.Provider value={{ changeTheme, currentTheme, isDarkModeActive }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useProvidedContext(ThemeContext, 'Theme')
