import 'server-only'

import { NextResponse, type NextFetchEvent, type NextRequest } from 'next/server'
import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

import { DEFAULT_LOCALE, getValidLocale, isPathnameMissingLocale, type Locale, LOCALES } from '@/i18n'
import type { CustomMiddleware } from '@/middleware'

const locales: Locale[] = [...LOCALES]

const getRequestLocale = (request: NextRequest): Locale => {
  const negotiatorHeaders = Object.fromEntries(request.headers)
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(locales)
  const matchedLocale = matchLocale(languages, locales, DEFAULT_LOCALE)

  return getValidLocale(matchedLocale)
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
