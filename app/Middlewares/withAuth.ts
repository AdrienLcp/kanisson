import { NextResponse, type NextFetchEvent, type NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

import type { CustomMiddleware } from '@root/middleware'
import type { Locale } from '@/Types'
import { I18N, PROTECTED_PATHS } from '@/Config'

const getProtectedRoutes = (protectedPaths: string[], locales: Locale[]) => {
  let protectedPathsWithLocale = [...protectedPaths]

  protectedPaths.forEach(route => {
    locales.forEach(locale => (
      protectedPathsWithLocale = [
        ...protectedPathsWithLocale,
        `/${locale}${route}`
      ]
    ))
  })

  return protectedPathsWithLocale
}

//! test this ?
// const getProtectedRoutes = (protectedPaths: string[], locales: Locale[]) => {
//   const protectedPathsWithLocale = protectedPaths.flatMap(route =>
//     locales.map(locale => `/${locale}${route}`)
//   )
//   return [...protectedPaths, ...protectedPathsWithLocale]
// }

export const withAuth = (middleware: CustomMiddleware) => {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const response = NextResponse.next()

    const token = await getToken({ req: request })

    //@ts-ignore
    request.nextauth = request.nextauth || {}

    //@ts-ignore
    request.nextauth.token = token
    const pathname = request.nextUrl.pathname

    const protectedPathsWithLocale = getProtectedRoutes(PROTECTED_PATHS, [...I18N.locales.map(locale => locale.key)])

    if (!token && protectedPathsWithLocale.includes(pathname)) {
      const signInUrl = new URL('/api/auth/signin', request.url)
      signInUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(signInUrl)
    }

    return middleware(request, event, response)
  }
}
