import type { MetadataRoute } from 'next'

import { env } from '@/env'
import { ROUTES } from '@/routes'

const baseUrl = env.NEXT_PUBLIC_BASE_URL

const getSitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const routesPath = Object.values(ROUTES)

  const sitemap: MetadataRoute.Sitemap = routesPath.map(path => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date()
  }))

  return sitemap
}

export default getSitemap
