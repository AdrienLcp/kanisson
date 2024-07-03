import 'server-only'

import { NextResponse, type NextFetchEvent, type NextRequest } from 'next/server'
import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

import { buildI18n, DEFAULT_LOCALE, type Dictionary, getValidLocale, type I18n, isPathnameMissingLocale, type Locale, LOCALES } from '@/i18n'
import type { CustomMiddleware } from '@/middleware'

export const getPathnameWithoutLocale = (currentPathname: string) => {
  if (!currentPathname) {
    return '/'
  }

  const pathnameWithoutLocale = currentPathname.substring(3)

  return pathnameWithoutLocale !== ''
    ? pathnameWithoutLocale
    : '/'
}

const locales: Locale[] = [...LOCALES]

const getRequestLocale = (request: NextRequest): Locale => {
  const negotiatorHeaders = Object.fromEntries(request.headers)
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(locales)
  const matchedLocale = matchLocale(languages, locales, DEFAULT_LOCALE)

  return getValidLocale(matchedLocale)
}

const getDictionary = async (locale?: Locale): Promise<Dictionary> => {
  const currentLocale = getValidLocale(locale)
  return import(`@/i18n/dictionaries/${currentLocale}.json`).then(module => module.default)
}

export const getI18n = async (locale?: Locale): Promise<I18n> => {
  const currentLocale = getValidLocale(locale)
  const dictionary = await getDictionary(currentLocale)

  const i18n = buildI18n(dictionary, currentLocale)
  return i18n
}

export const withLocale = (middleware: CustomMiddleware) => {
  return async (request: NextRequest, event: NextFetchEvent, response: NextResponse) => {
    const pathname = request.nextUrl.pathname

    if (isPathnameMissingLocale(pathname)) {
      const locale = getRequestLocale(request)
      const newUrl = new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)

      if (locale === DEFAULT_LOCALE) {
        return NextResponse.rewrite(newUrl)
      }

      return NextResponse.redirect(newUrl)
    }

    return middleware(request, event, response)
  }
}
