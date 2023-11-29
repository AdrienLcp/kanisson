import { useSession } from 'next-auth/react'

import { HUES, I18N, THEMES } from '@/Config'
import { getDictionary } from '@/I18n'

export type Locale = (typeof I18N)['locales'][number]['key']

type PageParam = {
  lang: Locale
}

export type PageProps = {
  params: PageParam
}

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>

export type Theme = typeof THEMES[number]
export type Hue = typeof HUES[number]

export type Session = ReturnType<typeof useSession>

export type AppRoute = {
  id: string
  path: string
  // roles: UserRole[]
}
