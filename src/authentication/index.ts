import type { Game, Playlist, Rating, User } from '@prisma/client'

import type { UserRole } from '@/user'
import type { RolePermissions } from '@/user/permissions'

type OmittedUserFields =
  'accounts' |
  'email' |
  'emailVerified' |
  'image' |
  'role' |
  'sessions' |
  'status' |
  'updatedAt'

type BaseAuthenticatedUser = Omit<User, OmittedUserFields>

// Force UserRole type for role field
type PrismaAuthenticatedUser = BaseAuthenticatedUser & {
  games: Game[]
  role: UserRole
  playlists: Playlist[]
  ratings: Rating[]
}

export type AuthenticatedUser = PrismaAuthenticatedUser & {
  permissions: RolePermissions
}

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

export const PROTECTED_PATHS = ['dashboard']
