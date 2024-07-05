'use server'

import { getValidRole } from '@/user'
import { AUTH_USER_SELECTED_FIELDS, type AuthenticatedUser, type AuthenticationErrorCode } from '@/authentication'
import { getUserPermissions } from '@/authentication/permissions'
import { getAuthSession } from '@/authentication/server'
import { handleUnknownServerError } from '@/helpers/errors'
import { error, type Result, success } from '@/helpers/result'
import prisma from '@/lib/prisma'

export type GetAuthenticatedUserResponse = Result<AuthenticatedUser, AuthenticationErrorCode>

export const getAuthenticatedUser = async (): Promise<GetAuthenticatedUserResponse> => {
  try {
    const authSession = await getAuthSession()

    if (authSession === null) {
      return error('unauthenticated')
    }

    const user = await prisma.user.findUnique({
      select: AUTH_USER_SELECTED_FIELDS,
      where: { id: authSession.user.id }
    })

    if (user === null) {
      return error('user_not_found')
    }

    const userRole = getValidRole(user.role)

    const authenticatedUser: AuthenticatedUser = {
      ...user,
      role: userRole,
      permissions: getUserPermissions(userRole)
    }

    return success(authenticatedUser)
  } catch (error) {
    return handleUnknownServerError(error)
  }
}
