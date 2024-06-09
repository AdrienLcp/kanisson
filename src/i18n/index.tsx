import Polyglot from './polyglot'

import { isValidString, type DotNestedKeys } from '@/helpers/strings'
import type frenchDictionary from '@/i18n/dictionaries/fr.json'

export const LOCALES = ['en', 'fr'] as const

export type Locale = typeof LOCALES[number]

export const DEFAULT_LOCALE: Locale = 'fr'

export type Dictionary = typeof frenchDictionary
export type I18n = typeof Polyglot.prototype.t
export type I18NStringPaths = DotNestedKeys<Dictionary>

export const isLocale = (value: string): value is Locale => {
  return LOCALES.includes(value as Locale)
}

export const getValidLocale = (locale?: unknown) => {
  if (typeof locale !== 'string') {
    return DEFAULT_LOCALE
  }

  return locale !== undefined && isLocale(locale)
    ? locale
    : DEFAULT_LOCALE
}

export const buildI18n = (dictionary: Dictionary, locale?: Locale): I18n => {
  const currentLocale = locale !== undefined && isLocale(locale)
    ? locale
    : DEFAULT_LOCALE

  const currentPolyglot = new Polyglot({ phrases: dictionary, locale: currentLocale })

  const i18n = (key: I18NStringPaths, options?: Record<string, string | number>) => {
    return currentPolyglot.t(key, options)
  }

  return i18n
}

export const isPathnameMissingLocale = (pathname: string) => {
  return LOCALES.every(locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`)
}

export const getPathnameWithoutLocale = (currentPathname: string) => {
  if (!currentPathname) {
    return '/'
  }

  const pathnameWithoutLocale = currentPathname.substring(3)

  return pathnameWithoutLocale !== ''
    ? pathnameWithoutLocale
    : '/'
}

export const getRedirectPathname = (pathname: string | null, locale: Locale) => {
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
