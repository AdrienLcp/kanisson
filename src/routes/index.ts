import { HomeIcon, PlusCircleIcon, SearchIcon, type LucideIcon } from 'lucide-react'

import type { Permission } from '@/authentication/permissions'
import type { I18n } from '@/i18n'

export const ROUTES = {
  create: '/playlists/create',
  contact: '/contact',
  edit: '/playlists/edit',
  home: '/',
  profile: '/profile',
  search: '/search',
  settings: '/settings'
} as const

export type RouteKey = keyof typeof ROUTES
export type RoutePath = typeof ROUTES[RouteKey]

export type NavLink = {
  ariaLabel: string
  hasUserAccess: boolean
  Icon: LucideIcon
  key: RouteKey
  label: string
  path: RoutePath
}

export const getCommonNavbarItems = (i18n: I18n, userPermissions: Permission[]) => {
  const navbarConfig: NavLink[] = [
    {
      ariaLabel: i18n('routes.home.link-aria-label'),
      hasUserAccess: true,
      key: 'home',
      label: i18n('routes.home.link-label'),
      path: ROUTES.home,
      Icon: HomeIcon
    },
    {
      ariaLabel: i18n('routes.search.link-aria-label'),
      hasUserAccess: true,
      key: 'search',
      label: i18n('routes.search.link-label'),
      path: ROUTES.search,
      Icon: SearchIcon
    },
    {
      ariaLabel: i18n('routes.playlists.create.link-aria-label'),
      hasUserAccess: userPermissions.includes('create_playlist'),
      key: 'create',
      label: i18n('routes.playlists.create.link-label'),
      path: ROUTES.create,
      Icon: PlusCircleIcon
    }
  ]

  return navbarConfig
}
