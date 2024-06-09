import type { LucideIcon } from 'lucide-react'

export type RouteKey = 'create' | 'home' | 'profile' | 'search' | 'settings'
export type RoutePath = '/' | `/${RouteKey}`

export const ROUTES: Record<RouteKey, RoutePath> = {
  create: '/create',
  home: '/',
  profile: '/profile',
  search: '/search',
  settings: '/settings'
} as const

export type NavLink = {
  Icon: LucideIcon
  key: RouteKey
  label: string
  path: RoutePath
}
