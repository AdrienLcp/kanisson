import type { Game, Playlist, Rating, User } from '@prisma/client'

import type { UserRole } from '@/user'
import type { UserPermission } from '@/authentication/permissions'

type PickedUserFields
  = 'avatar'
  | 'createdAt'
  | 'id'
  | 'name'
  | 'pseudo'

type BaseAuthenticatedUser = Pick<User, PickedUserFields>

// Force UserRole type for role field
type PrismaAuthenticatedUser = BaseAuthenticatedUser & {
  games: Game[]
  role: UserRole
  playlists: Playlist[]
  ratings: Rating[]
}

export type AuthenticatedUser = PrismaAuthenticatedUser & {
  permissions: UserPermission[]
}

export type AuthenticationErrorCode
  = 'unauthenticated'
  | 'unauthorized'
  | 'user_not_found'

export const AUTH_USER_SELECTED_FIELDS: Record<keyof PrismaAuthenticatedUser, true> = {
  avatar: true,
  createdAt: true,
  games: true,
  id: true,
  name: true,
  playlists: true,
  pseudo: true,
  ratings: true,
  role: true
}

export const PROTECTED_PATHS = ['admin']
