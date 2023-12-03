'use client'

import { createContext, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import type { Locale, Dictionary } from '@/Types'
import { getRedirectedPathname, getStoredItem } from '@/Helpers'
import { LOCALES } from '@/Config'

type LocaleContext = {
  dictionary: Dictionary
}

type LocaleProvider = React.PropsWithChildren<{
  dictionary: Dictionary
}>

export const LocaleContext = createContext<LocaleContext | null>(null)

export const LocaleProvider: React.FC<LocaleProvider> = ({ children, dictionary }) => {
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const previousLocale = getStoredItem<Locale>('locale')

    if (previousLocale && LOCALES.includes(previousLocale)) {
      const newPath = getRedirectedPathname(pathname, previousLocale)

      if (newPath !== pathname) {
        router.push(newPath)
      }
    }
  }, [pathname, router])

  return (
    <LocaleContext.Provider value={{ dictionary }}>
      {children}
    </LocaleContext.Provider>
  )
}
