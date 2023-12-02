import type { UserRole } from '@prisma/client'
import { useSession } from 'next-auth/react'

import { HUES, LOCALES, THEMES } from '@/Config'
import { getDictionary } from '@/I18n'

type PageParam = {
  lang: Locale
}

export type PageProps = {
  params: PageParam
}

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>

export type Theme = typeof THEMES[number]
export type Hue = typeof HUES[number]
export type Locale = typeof LOCALES[number]

export type Session = ReturnType<typeof useSession>

export type AppRoute = {
  id: string
  path: string
  roles: UserRole[]
}
