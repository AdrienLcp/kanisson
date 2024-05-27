export type Role = 'visitor' | 'user' | 'moderator' | 'admin'

type PlaylistPermission = '' | ''
type UserPermission = '' | ''

type RolePermission = {
  playlist: PlaylistPermission[]
  user: UserPermission[]
}

const permissions: Record<Role, RolePermission> = {
  visitor: {
    playlist: [],
    user: []
  },
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

export const getUserRights = (role: Role) => {
  return permissions[role]
}
