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

type BaseAuthUser = Omit<User, OmittedUserFields>

// Force UserRole type for role field
type PrismaAuthUser = BaseAuthUser & {
  games: Game[]
  role: UserRole
  playlists: Playlist[]
  ratings: Rating[]
}

export type AuthUser = PrismaAuthUser & {
  permissions: RolePermissions
}

export const AUTH_USER_SELECTED_FIELDS: Record<keyof PrismaAuthUser, true> = {
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
