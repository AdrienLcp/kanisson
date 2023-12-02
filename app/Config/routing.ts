import { UserRole } from '@prisma/client'

export const PROTECTED_PATHS = ['/admin']

export const PUBLIC_FILES = ['next.svg', 'vercel.svg']

const ROUTES_NAMES = ['contact', 'create', 'dashboard', 'home', 'profile', 'search', 'settings', 'user'] as const

export type RouteName = typeof ROUTES_NAMES[number]

export type AppRoute = {
  id: string
  path: string
  roles: readonly UserRole[]
}

export const ROUTES: Record<RouteName, AppRoute> = {
  contact: {
    id: 'contact',
    path: '/contact',
    roles: []
  },
  create: {
    id: 'create',
    path: '/create',
    roles: [UserRole.admin, UserRole.moderator, UserRole.user]
  },
  dashboard: {
    id: 'dashboard',
    path: '/dashboard',
    roles: [UserRole.admin, UserRole.moderator]
  },
  home:{
    id: 'home',
    path: '/',
    roles: []
  },
  profile: {
    id: 'profile',
    path: '/profile',
    roles: [UserRole.admin, UserRole.moderator, UserRole.user]
  },
  search: {
    id: 'search',
    path: '/search',
    roles: []
  },
  settings: {
    id: 'settings',
    path: '/settings',
    roles: []
  },
  user: {
    id: 'user',
    path: '/user',
    roles: []
  }
} as const
