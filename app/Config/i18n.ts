import type { StaticImageData } from 'next/image'

import type { Locale } from '@/Types'

import france from '@/Assets/images/france.png'
import usa from '@/Assets/images/usa.png'

type LocaleObject = {
  key: Locale
  label: string
  icon: StaticImageData
}

type I18n = {
  defaultLocale: Locale
  locales: readonly LocaleObject[]
}

export const I18N: I18n = {
  defaultLocale: 'fr',
  locales: [
    { key: 'fr', label: 'Français', icon: france },
    { key: 'en', label: 'English', icon: usa }
  ]
} as const
