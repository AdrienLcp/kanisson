'use client'

import Polyglot from './polyglot'
import React from 'react'

import type { DotNestedKeys } from '@/helpers/strings'
import { getStoredItem } from '@/helpers/local-storage'
import { useProvidedContext } from '@/helpers/contexts'

import englishDictionary from '@/i18n/dictionaries/en.json'
import frenchDictionary from '@/i18n/dictionaries/fr.json'

export const LOCALES = ['en', 'fr'] as const
export type Locale = typeof LOCALES[number]
export const DEFAULT_LOCALE: Locale = 'fr'

export type Dictionary = typeof frenchDictionary
export type I18n = typeof Polyglot.prototype.t
export type I18NStringPath = DotNestedKeys<Dictionary>

export const isLocale = (value: string): value is Locale => {
  return LOCALES.includes(value as Locale)
}

export const buildI18n = (dictionary: Dictionary, locale?: Locale): I18n => {
  const currentLocale = locale !== undefined && isLocale(locale)
    ? locale
    : DEFAULT_LOCALE

  const currentPolyglot = new Polyglot({ phrases: dictionary, locale: currentLocale })

  const i18n = (key: I18NStringPath, options?: Record<string, string | number>) => {
    return currentPolyglot.t(key, options)
  }

  return i18n
}

const localeDictionaries: Record<Locale, Dictionary> = {
  en: englishDictionary,
  fr: frenchDictionary
}

type I18nContextValue = {
  changeLocale: (newLocale: Locale) => void
  currentLocale: Locale
  i18n: I18n
}

export const I18nContext = React.createContext<I18nContextValue | null>(null)

export const I18nProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [currentLocale, setCurrentLocale] = React.useState<Locale>(DEFAULT_LOCALE)

  const changeLocale = (newLocale: Locale) => {
    if (isLocale(newLocale)) {
      setCurrentLocale(newLocale)
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

  const currentDictionary = localeDictionaries[currentLocale] ?? frenchDictionary
  const i18n = buildI18n(currentDictionary, currentLocale)

  return (
    <I18nContext.Provider value={{ changeLocale, currentLocale, i18n }}>
      {children}
    </I18nContext.Provider>
  )
}

export const useI18n = () => useProvidedContext(I18nContext, 'i18n')
