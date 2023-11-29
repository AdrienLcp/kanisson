'use client'

import { createContext } from 'react'

import type { Dictionary } from '@/Types'

type LocaleContext = {
  strings: Dictionary
}

type LocaleProvider = React.PropsWithChildren &{
  strings: Dictionary
}

export const LocaleContext = createContext<LocaleContext | null>(null)

export const LocaleProvider: React.FC<LocaleProvider> = ({ children, strings }) => (
  <LocaleContext.Provider value={{ strings }}>
    {children}
  </LocaleContext.Provider>
)
