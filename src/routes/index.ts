import { HomeIcon, PlusCircleIcon, SearchIcon, type LucideIcon } from 'lucide-react'

import type { I18n } from '@/i18n'

export type RouteKey =
  'create' |
  'contact' |
  'home' |
  'profile' |
  'search' |
  'settings'

export type RoutePath = '/' | `/${RouteKey}` | `/${RouteKey}/${RouteKey}`

export const ROUTES: Record<RouteKey, RoutePath> = {
  create: '/create',
  contact: '/contact',
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

export const getCommonNavbarItems = (i18n: I18n) => {
  const navbarConfig: NavLink[] = [
    {
      key: 'home',
      label: i18n('routes.home.link-label'),
      path: ROUTES.home,
      Icon: HomeIcon
    },
    {
      key: 'search',
      label: i18n('routes.search.link-label'),
      path: ROUTES.search,
      Icon: SearchIcon
    },
    {
      key: 'create',
      label: i18n('routes.create.link-label'),
      path: ROUTES.create,
      Icon: PlusCircleIcon
    }
  ]

  return navbarConfig
}
