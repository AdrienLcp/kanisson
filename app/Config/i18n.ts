import type { Locale } from '@/Types'

type LocaleObject = {
  key: Locale
  label: string
}

type I18n = {
  defaultLocale: Locale
  locales: readonly LocaleObject[]
}

export const I18N: I18n = {
  defaultLocale: 'fr',
  locales: [
    { key: 'fr', label: 'Français' },
    { key: 'en', label: 'English' }
  ]
} as const
