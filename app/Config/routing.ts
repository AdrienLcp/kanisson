import type { AppRoute } from '@/Types'

export const PROTECTED_PATHS = ['/admin']

export const PUBLIC_FILES = ['next.svg', 'vercel.svg']

export const ROUTES: Record<string, AppRoute> = {
  profile: {
    id: 'profile',
    path: '/profile'
  },
  settings: {
    id: 'settings',
    path: '/settings'
  }
} as const
