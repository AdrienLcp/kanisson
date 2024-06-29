'use server'

import { AUTH_USER_SELECTED_FIELDS, type AuthenticatedUser, type AuthenticatedUserErrorCode } from '@/authentication'
import { getAuthSession } from '@/authentication/server'
import { error, handleError, type Result, success } from '@/helpers/result'
import prisma from '@/lib/prisma'
import { getValidRole } from '@/user'
import { getUserPermissions } from '@/user/permissions'

type GetAuthenticatedUserResponse = Result<AuthenticatedUser, AuthenticatedUserErrorCode>

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
    return handleError(error)
  }
}
