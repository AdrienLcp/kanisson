import 'server-only'
import type { Locale } from '@/Types'

export const I18N = {
  defaultLocale: 'fr',
  locales: ['fr', 'en']
} as const

const dictionaries = {
  fr: () => import('@/Locales/fr.json').then(module => module.default),
  en: () => import('@/Locales/en.json').then(module => module.default)
} as const

export const getStrings = async (locale: Locale) => dictionaries[locale]() ?? dictionaries[I18N.defaultLocale]()
