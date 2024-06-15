'use client'

import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

import { useProvidedContext } from '@/helpers/contexts'
import { isValidString } from '@/helpers/strings'
import { buildI18n, DEFAULT_LOCALE, type Dictionary, type I18n, isLocale, isPathnameMissingLocale, type Locale } from '@/i18n'

type I18nContextValue = {
  changeLocale: (newLocale: Locale) => void
  currentLocale: Locale
  i18n: I18n
}

export const I18nContext = React.createContext<I18nContextValue | null>(null)

export type I18nProviderProps = React.PropsWithChildren & {
  dictionary: Dictionary
  locale: Locale
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
      : `/${segments.splice(2).join('/')}`
  }

  const segments = pathname.split('/')
  segments[1] = locale
  return segments.join('/')
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children, dictionary, locale }) => {
  const pathname = usePathname()
  const router = useRouter()

  const i18n = buildI18n(dictionary, locale)

  const changeLocale = (newLocale: Locale) => {
    if (!isLocale(newLocale) || newLocale === locale) {
      return
    }

    const newPathname = getRedirectPathname(pathname, newLocale)

    if (newPathname !== pathname) {
      router.push(newPathname)
    }
  }

  return (
    <I18nContext.Provider value={{ changeLocale, i18n, currentLocale: locale }}>
      {children}
    </I18nContext.Provider>
  )
}

export const useI18n = () => useProvidedContext(I18nContext, 'i18n')
