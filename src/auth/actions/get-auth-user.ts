import { AUTH_USER_SELECTED_FIELDS, type AuthUser } from '@/auth'
import { getAuthSession } from '@/auth/server'
import prisma from '@/lib/prisma'
import { getValidRole } from '@/user'
import { getUserPermissions } from '@/user/permissions'

export const getAuthUser = async (): Promise<AuthUser | null> => {
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

    const authUser: AuthUser = {
      ...user,
      role: userRole,
      permissions: getUserPermissions(userRole)
    }

    return authUser
  } catch (error) {
    console.error(error)
    return null
  }
}
