import 'server-only'

import type { Locale } from '@/Types'
import { I18N } from '@/Config'

const dictionaries = {
  fr: () => import('@/Locales/fr.json').then(module => module.default),
  en: () => import('@/Locales/en.json').then(module => module.default)
}

export const getDictionary = async (locale: Locale) => dictionaries[locale]() ?? dictionaries[I18N.defaultLocale]()
