import type { UserRole } from '@prisma/client'

import type { ApiResponse, Dictionary, User } from '@/Types'
import { getPublicUserSelectedFields } from '@/Helpers'
import { getAuthSession, prisma } from '@/Lib'

type PromoteUserRequest = {
  userId: string
  newRole: 'moderator' | 'user'
  dictionary: Dictionary
}

const AUTHORIZED_ROLES: UserRole[] = ['moderator', 'user']
const REQUIRED_ROLES: UserRole[] = ['moderator', 'admin']

export const manageUser = async (request: PromoteUserRequest): Promise<ApiResponse<User>> => {
  const { newRole, dictionary, userId } = request
  const errors = dictionary.api.errors

  try {
    if (!AUTHORIZED_ROLES.includes(newRole) || typeof userId !== 'string' || typeof newRole !== 'string') {
      return { error: errors.server.badRequest }
    }

    const session = await getAuthSession()

    if (!session) {
      return { error: errors.server.unauthorized }
    }

    const currentUser = await prisma.user.findUnique({
      where: { id: session.user.id }
    })

    if (!currentUser) {
      return { error: errors.server.unauthorized }
    }

    if (!REQUIRED_ROLES.includes(currentUser.role)) {
      return { error: errors.server.forbidden }
    }

    const managedUser = await prisma.user.update({
      where: { publicId: userId },
      data: { role: newRole },
      select: getPublicUserSelectedFields()
    })

    if (!managedUser) {
      return { error: errors.user.doesntExist }
    }

    if (managedUser.role !== newRole) {
      return { error: errors.server.internal }
    }

    return { data: managedUser }
  } catch (error) {
    console.error(error)
    return { error: errors.server.internal }
  }
}
