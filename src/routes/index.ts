import { HomeIcon, PlusCircleIcon, SearchIcon, type LucideIcon } from 'lucide-react'

import type { I18n } from '@/i18n'

export const ROUTES = {
  create: '/playlists/create',
  contact: '/contact',
  home: '/',
  profile: '/profile',
  search: '/search',
  settings: '/settings'
} as const

export type RouteKey = keyof typeof ROUTES
export type RoutePath = typeof ROUTES[RouteKey]

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
