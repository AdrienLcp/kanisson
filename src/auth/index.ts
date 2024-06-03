import type { Game, Playlist, Rating, User } from '@prisma/client'

import type { UserRole } from '@/user'
import type { RolePermissions } from '@/user/permissions'

type OmittedUserProps =
  'accounts' |
  'email' |
  'emailVerified' |
  'image' |
  'sessions' |
  'updatedAt'

type BaseAuthUser = Omit<User, OmittedUserProps>

type PrismaAuthUser = BaseAuthUser & {
  games: Game[]
  role: UserRole
  playlists: Playlist[]
  ratings: Rating[]
}

// Force UserRole type for role field
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
  role: true,
  status: true
}
