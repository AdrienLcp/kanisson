import { type NextFetchEvent, type NextRequest, NextResponse } from 'next/server'
import type { NextMiddlewareResult } from 'next/dist/server/web/types'

import { withAuth, withLocale } from '@/Middlewares'

export type CustomMiddleware = (
  request: NextRequest,
  event: NextFetchEvent,
  response: NextResponse
) => NextMiddlewareResult | Promise<NextMiddlewareResult>

type MiddlewareFactory = (middleware: CustomMiddleware) => CustomMiddleware

export const chain = (functions: MiddlewareFactory[], index = 0): CustomMiddleware => {
  const current = functions[index]

  if (current) {
    const next = chain(functions, index + 1)
    return current(next)
  }

  return (_request, _event, response) => response
}

export default chain([withAuth, withLocale])

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
