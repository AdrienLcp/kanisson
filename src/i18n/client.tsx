'use client'

import React from 'react'

import { useProvidedContext } from '@/helpers/contexts'
import { type Dictionary, type Locale, type I18n, isLocale, buildI18n, getRedirectPathname } from '@/i18n'
import { usePathname, useRouter } from 'next/navigation'

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
