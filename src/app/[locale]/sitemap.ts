import type { MetadataRoute } from 'next'

import { env } from '@/env'
import { DEFAULT_LOCALE, LOCALES } from '@/i18n'
import { ROUTES } from '@/routes'

const baseUrl = env.NEXT_PUBLIC_BASE_URL
const alternatesLocales = LOCALES.filter(locale => locale !== DEFAULT_LOCALE)

const getSitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const routesPath = Object.values(ROUTES)

  const sitemap: MetadataRoute.Sitemap = routesPath.map(path => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    alternates: {
      languages: Object.fromEntries(alternatesLocales.map(locale => (
        [locale, `${baseUrl}/${locale}${path}`]
      )))
    }
  }))

  return sitemap
}

export default getSitemap
