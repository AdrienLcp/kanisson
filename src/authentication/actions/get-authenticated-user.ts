import { AUTH_USER_SELECTED_FIELDS, type AuthenticatedUser } from '@/authentication'
import { getAuthSession } from '@/authentication/server'
import prisma from '@/lib/prisma'
import { getValidRole } from '@/user'
import { getUserPermissions } from '@/user/permissions'

export const getAuthenticatedUser = async (): Promise<AuthenticatedUser | null> => {
  try {
    const authSession = await getAuthSession()

    if (authSession === null) {
      return null
    }

    const user = await prisma.user.findUnique({
      select: AUTH_USER_SELECTED_FIELDS,
      where: { id: authSession.user.id }
    })

    if (user === null) {
      return null
    }

    const userRole = getValidRole(user.role)

    const authenticatedUser: AuthenticatedUser = {
      ...user,
      role: userRole,
      permissions: getUserPermissions(userRole)
    }

    return authenticatedUser
  } catch (error) {
    console.error(error)
    return null
  }
}
