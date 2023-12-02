import { UserRole } from '@prisma/client'

export const PROTECTED_PATHS = ['/admin']

export const PUBLIC_FILES = ['next.svg', 'vercel.svg']

export type AppRoute = {
  id: string
  path: string
  description: string
  roles: readonly UserRole[]
}

export const ROUTES: Record<string, AppRoute> = {
  contact: {
    id: 'contact',
    path: '/contact',
    description: 'Guest or user can contact Kanisson\'s team',
    roles: []
  },
  create: {
    id: 'create',
    path: '/create',
    description: 'User can create a playlist (blind test)',
    roles: [UserRole.admin, UserRole.moderator, UserRole.user]
  },
  dashboard: {
    id: 'dashboard',
    path: '/dashboard',
    description: 'Admin & moderators can manage users & playlists',
    roles: [UserRole.admin, UserRole.moderator]
  },
  home:{
    id: 'home',
    path: '/',
    description: 'Guest or user can see the home page',
    roles: []
  },
  playlists: {
    id: 'playlists',
    path: '/playlists',
    description: 'User can see & manage the playlists he created',
    roles: [UserRole.admin, UserRole.moderator, UserRole.user]
  },
  profile: {
    id: 'profile',
    path: '/profile',
    description: 'User can see & manage his own informations, see games he played, scores, likes, ratings, etc',
    roles: [UserRole.admin, UserRole.moderator, UserRole.user]
  },
  search: {
    id: 'search',
    path: '/search',
    description: 'User can search a playlist with deep filters',
    roles: []
  },
  settings: {
    id: 'settings',
    path: '/settings',
    description: 'User or guest can see the settings page & change his language, theme, etc',
    roles: []
  },
  user: {
    id: 'user',
    path: '/user',
    description: 'User or guest can see a user profile page & playlists he created',
    roles: []
  }
} as const
