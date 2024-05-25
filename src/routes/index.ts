type RouteKey = 'home'
type RoutePath = '/' | `/${RouteKey}`

const HOME_PATH: RoutePath = '/'

export const routes: Record<RouteKey, RoutePath> = {
  home: HOME_PATH
}
