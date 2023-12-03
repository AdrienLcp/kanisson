import type { Locale } from '@/Types'

export const getPathnameWithoutLocale = (currentPathname: string) => {
  if (!currentPathname) {
    return '/'
  }

  const pathnameWithoutLocale = currentPathname.substring(3)
  
  if (pathnameWithoutLocale === '') {
    return '/'
  }
  
  return pathnameWithoutLocale
}

export const getRedirectedPathname = (pathname: string, locale: Locale) => {
  if (!pathname) {
    return '/'
  }

  const segments = [...pathname.split('/')]
  segments[1] = locale
  return segments.join('/')
}
