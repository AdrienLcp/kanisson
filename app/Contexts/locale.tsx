'use client'

import { createContext, useCallback, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import { Locale, type Dictionary } from '@/Types'
import { getStoredItem } from '@/Helpers'
import { LOCALES } from '@/Config'

type LocaleContext = {
  strings: Dictionary
}

type LocaleProvider = React.PropsWithChildren &{
  strings: Dictionary
}

export const LocaleContext = createContext<LocaleContext | null>(null)

export const LocaleProvider: React.FC<LocaleProvider> = ({ children, strings }) => {
  const pathname = usePathname()
  const router = useRouter()
  
  const getRedirectedPathname = useCallback((locale: Locale) => {
    if (!pathname) {
      return '/'
    }

    const segments = pathname.split('/')
    segments[1] = locale
    return segments.join('/')
  }, [pathname])

  useEffect(() => {
    const previousLocale = getStoredItem<Locale>('locale')

    if (previousLocale && LOCALES.includes(previousLocale)) {
      router.push(getRedirectedPathname(previousLocale))
    }
  }, [getRedirectedPathname, router])

  return (
    <LocaleContext.Provider value={{ strings }}>
      {children}
    </LocaleContext.Provider>
  )
}
