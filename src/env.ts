import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  client: {
    NEXT_PUBLIC_BASE_URL: z.string(),
    NEXT_PUBLIC_FORM_SPREE_KEY: z.string()
  },
  server: {
    DATABASE_URL: z.string(),
    GOOGLE_ID: z.string(),
    GOOGLE_SECRET: z.string(),
    YOUTUBE_API_KEY: z.string()
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_FORM_SPREE_KEY: process.env.NEXT_PUBLIC_FORM_SPREE_KEY
  }
})
