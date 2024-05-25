import type { MetadataRoute } from 'next'

import { env } from '@/env'

const baseUrl = env.NEXT_PUBLIC_BASE_URL

const getRobots = (): MetadataRoute.Robots => {
  const robots: MetadataRoute.Robots = {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/**'
    },
    sitemap: `${baseUrl}/sitemap.xml`
  }

  return robots
}

export default getRobots
