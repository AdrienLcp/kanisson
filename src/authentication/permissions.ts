import { getAuthenticatedUser, type GetAuthenticatedUserResponse } from '@/authentication/actions/get-authenticated-user'
import { error, success } from '@/helpers/result'
import { getArrayFromStrings } from '@/helpers/strings'
import type { UserRole } from '@/user'

const USER_PERMISSIONS = [
  'create_playlist',
  'search_tracks'
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

type UserPermissions = UserPermission | UserPermission[]

export const getAuthenticatedUserWithPermissions = async (permissions: UserPermissions): Promise<GetAuthenticatedUserResponse> => {
  const authenticatedUser = await getAuthenticatedUser()

  if (authenticatedUser.status === 'error') {
    return error(authenticatedUser.errors)
  }

  const requiredPermissions = getArrayFromStrings(permissions)
  const userPermissions = getUserPermissions(authenticatedUser.data.role)

  const isUserAuthorized = requiredPermissions.every(permission => userPermissions.includes(permission))

  if (!isUserAuthorized) {
    return error('unauthorized')
  }

  return success(authenticatedUser.data)
}
