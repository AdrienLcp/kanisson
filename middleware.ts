import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

import { I18N } from '@/Config'

const getLocale = (request: NextRequest): string | undefined => {
  const negotiatorHeaders = Object.fromEntries(request.headers)
  const locales: string[] = [...I18N.locales]

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(locales)

  return matchLocale(languages, locales, I18N.defaultLocale)
}

const PUBLIC_FILES = ['next.svg', 'vercel.svg']

export const middleware = (request: NextRequest) => {
  const pathname = request.nextUrl.pathname

  // `/_next/` and `/api/` are ignored by the watcher, but we need to ignore files in `public` manually.
  // If you have one
  if (PUBLIC_FILES.includes(pathname)) {
    return
  }

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = I18N.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)

    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url
      )
    )
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
