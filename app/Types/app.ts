import type { Track } from '@prisma/client'
import type { LucideIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'

import { HUES, LOCALES, THEMES } from '@/Config'
import { getDictionary } from '@/Locales'

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

export type NavLink = {
  id: string
  path: string
  label?: string
  Icon: LucideIcon
  isVisible: boolean
}

export type TrackResult = {
  id: string
  title: string
}

export type TrackDTO = Omit<Track, 'id' | 'playlistId'>
