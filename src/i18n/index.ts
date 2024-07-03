import Polyglot from './polyglot'

import { isValidString, type DotNestedKeys } from '@/helpers/strings'

import englishDictionary from '@/i18n/dictionaries/en.json'
import frenchDictionary from '@/i18n/dictionaries/fr.json'

export const LOCALES = ['en', 'fr'] as const
export type Locale = typeof LOCALES[number]

export const DEFAULT_LOCALE: Locale = 'fr'
export type Dictionary = typeof frenchDictionary

export type I18n = typeof Polyglot.prototype.t
export type I18NStringPath = DotNestedKeys<Dictionary>

export const isLocale = (value: unknown): value is Locale => {
  if (!isValidString(value)) {
    return false
  }

  return LOCALES.includes(value as Locale)
}

export const getValidLocale = (locale: unknown) => {
  return isLocale(locale)
    ? locale
    : DEFAULT_LOCALE
}

const buildI18n = (dictionary: Dictionary, locale: Locale): I18n => {
  const currentLocale = getValidLocale(locale)
  const currentPolyglot = new Polyglot({ phrases: dictionary, locale: currentLocale })

  const i18n = (key: I18NStringPath, options?: Record<string, string | number>) => {
    return currentPolyglot.t(key, options)
  }

  return i18n
}

export const isPathnameMissingLocale = (pathname: string) => {
  return LOCALES.every(locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`)
}

const localeDictionaries: Record<Locale, Dictionary> = {
  en: englishDictionary,
  fr: frenchDictionary
}

const DEFAULT_DICTIONARY = localeDictionaries[DEFAULT_LOCALE] ?? frenchDictionary

const getDictionaryByLocale = (locale: Locale) => {
  return localeDictionaries[locale] ?? DEFAULT_DICTIONARY
}

export const getI18n = (locale: Locale): I18n => {
  const dictionary = getDictionaryByLocale(locale)
  return buildI18n(dictionary, locale)
}

