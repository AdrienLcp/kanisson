import { NextResponse, type NextFetchEvent, type NextRequest } from 'next/server'
import Negotiator from 'negotiator'
import { match as matchLocale } from '@formatjs/intl-localematcher'

import type { CustomMiddleware } from '@root/middleware'
import type { Locale } from '@/Types'
import { I18N } from '@/Config'


const getLocale = (request: NextRequest): string | undefined => {
  const negotiatorHeaders = Object.fromEntries(request.headers)
  const locales: Locale[] = [...I18N.locales.map(locale => locale.key)]

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(locales)

  return matchLocale(languages, locales, I18N.defaultLocale)
}

export const withLocale = (middleware: CustomMiddleware) => {
  return async (request: NextRequest, event: NextFetchEvent, response: NextResponse) => {
    const pathname = request.nextUrl.pathname
    const pathnameIsMissingLocale = I18N.locales.every(locale => !pathname.startsWith(`/${locale.key}/`) && pathname !== `/${locale.key}`)

    if (pathnameIsMissingLocale) {
      const locale = getLocale(request)
      const newUrl = new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)
      return NextResponse.redirect(newUrl)
    }

    return middleware(request, event, response)
  }
}
