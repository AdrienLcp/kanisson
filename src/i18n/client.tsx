'use client'

import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

import { useProvidedContext } from '@/helpers/contexts'
import { getStoredItem } from '@/helpers/local-storage'
import { isValidString } from '@/helpers/strings'
import { DEFAULT_LOCALE, getI18n, isLocale, isPathnameMissingLocale, type I18n, type Locale } from '@/i18n'

type I18nContextValue = {
  changeLocale: (newLocale: Locale) => void
  currentLocale: Locale
  i18n: I18n
}

const getRedirectPathname = (pathname: string | null, locale: Locale) => {
  if (!isValidString(pathname)) {
    return '/'
  }

  if (isPathnameMissingLocale(pathname)) {
    return locale === DEFAULT_LOCALE
      ? pathname
      : `/${locale}${pathname}`
  }

  if (locale === DEFAULT_LOCALE) {
    const segments = pathname.split('/')
    const isHome = segments.length === 2

    return isHome
      ? '/'
      // : segments.splice(1, 1).join('/')
      : `/${segments.splice(2).join('/')}`
  }

  const segments = pathname.split('/')
  segments[1] = locale
  return segments.join('/')
}

export const I18nContext = React.createContext<I18nContextValue | null>(null)

export const I18nProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [currentLocale, setCurrentLocale] = React.useState<Locale>(DEFAULT_LOCALE)

  const pathname = usePathname()
  const router = useRouter()

  const changeLocale = (newLocale: Locale) => {
    if (!isLocale(newLocale)) {
      return
    }

    const newPathname = getRedirectPathname(pathname, newLocale)

    if (newPathname !== pathname) {
      router.push(newPathname)
    }
  }

  React.useEffect(() => {
    const favoriteLocale = getStoredItem('locale')

    if (favoriteLocale !== undefined) {
      setCurrentLocale(favoriteLocale)
      return
    }

    const navigatorLanguage = navigator.language.slice(0, 2).toLowerCase()

    if (isLocale(navigatorLanguage)) {
      setCurrentLocale(navigatorLanguage)
    }
  }, [])

  React.useEffect(() => {
    if (pathname !== null) {
      const locale = pathname.split('/')[1]

      if (isLocale(locale)) {
        setCurrentLocale(locale)
      }
    }
  }, [pathname])

  const i18n = getI18n(currentLocale)

  return (
    <I18nContext.Provider value={{ changeLocale, currentLocale, i18n }}>
      {children}
    </I18nContext.Provider>
  )
}

export const useI18n = () => useProvidedContext(I18nContext, 'i18n')
