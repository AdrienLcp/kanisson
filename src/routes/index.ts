type RouteKey = 'home'
type RoutePath = '/' | `/${RouteKey}`

export const routes: Record<RouteKey, RoutePath> = {
  home: '/'
} as const
