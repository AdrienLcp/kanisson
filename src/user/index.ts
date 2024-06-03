import type { Game, Playlist, User } from '@prisma/client'

const USER_ROLES = ['user', 'moderator', 'admin'] as const
export type UserRole = typeof USER_ROLES[number]

type OmittedUserProps =
  'accounts' |
  'email' |
  'emailVerified' |
  'image' |
  'name' |
  'permissions' |
  'role' |
  'sessions' |
  'updatedAt'

type BasePublicUser = Omit<User, OmittedUserProps>

// Force UserRole type for role field
export type PublicUser = BasePublicUser & {
  games: Game[]
  // TODO: type PublicPlaylist with just title & desc ? Idem for games ?
  playlists: Playlist[]
  role: UserRole
}

export const getValidRole = (role: string): UserRole => {
  const maybeRole = role as UserRole
  const isValidRole = USER_ROLES.includes(maybeRole)

  return isValidRole
    ? maybeRole
    : 'user'
}

export const PUBLIC_USER_SELECTED_FIELDS: Record<keyof PublicUser, true> = {
  avatar: true,
  createdAt: true,
  games: true,
  id: true,
  playlists: true,
  pseudo: true,
  role: true,
  status: true
}
