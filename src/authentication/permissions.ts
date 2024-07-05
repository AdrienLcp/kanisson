import { getAuthenticatedUser, type GetAuthenticatedUserResponse } from '@/authentication/actions/get-authenticated-user'
import { error, success } from '@/helpers/result'
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

export type UserPermission
  = typeof USER_PERMISSIONS[number]
  | typeof MODERATOR_PERMISSIONS[number]
  | typeof ADMIN_PERMISSIONS[number]

const permissions: Record<UserRole, UserPermission[]> = {
  user: [...USER_PERMISSIONS],
  moderator: [...MODERATOR_PERMISSIONS],
  admin: [...ADMIN_PERMISSIONS]
} as const

export const getUserPermissions = (role: UserRole) => {
  return permissions[role] ?? permissions.user
}

export const getAuthenticatedUserWithPermission = async (permission: UserPermission): Promise<GetAuthenticatedUserResponse> => {
  const authenticatedUser = await getAuthenticatedUser()

  if (authenticatedUser.status === 'error') {
    return error(authenticatedUser.errors)
  }

  if (!authenticatedUser.data.permissions.includes(permission)) {
    return error('unauthorized')
  }

  return success(authenticatedUser.data)
}
