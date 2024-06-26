import type { UserRole } from '@/user'

const USER_PERMISSIONS = [
  'create_playlist'
] as const

const MODERATOR_PERMISSIONS = [
  ...USER_PERMISSIONS
] as const

const ADMIN_PERMISSIONS = [
  ...MODERATOR_PERMISSIONS
] as const

export type Permission =
  typeof USER_PERMISSIONS[number] |
  typeof MODERATOR_PERMISSIONS[number] |
  typeof ADMIN_PERMISSIONS[number]

const permissions: Record<UserRole, Permission[]> = {
  user: [...USER_PERMISSIONS],
  moderator: [...MODERATOR_PERMISSIONS],
  admin: [...ADMIN_PERMISSIONS]
} as const

export const getUserPermissions = (role: UserRole) => {
  return permissions[role] ?? permissions.user
}
