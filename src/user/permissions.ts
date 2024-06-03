import type { UserRole } from '@/user'

type PlaylistPermission = '' | ''
type UserPermission = '' | ''

export type RolePermissions = {
  playlist: PlaylistPermission[]
  user: UserPermission[]
}

const permissions: Record<UserRole, RolePermissions> = {
  user: {
    playlist: [],
    user: []
  },
  moderator: {
    playlist: [],
    user: []
  },
  admin: {
    playlist: [],
    user: []
  }
} as const

export const getUserPermissions = (role: UserRole) => {
  return permissions[role] ?? permissions.user
}
