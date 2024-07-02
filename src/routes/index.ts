export const ROUTES = {
  create: '/playlists/create',
  contact: '/contact',
  edit: '/playlists/edit',
  home: '/',
  search: '/search',
  settings: '/settings',
  user: '/user'
} as const

export type RouteKey = keyof typeof ROUTES
export type RoutePath = typeof ROUTES[RouteKey]
