import type { UserRole } from '@prisma/client'

import type { ApiResponse, Dictionary, PublicUser } from '@/Types'
import { getPublicUserSelectedFields } from '@/Helpers'
import { getAuthSession, prisma } from '@/Lib'

const AUTHORIZED_ROLES: UserRole[] = ['moderator', 'user']
const REQUIRED_ROLES: UserRole[] = ['moderator', 'admin']

type PromoteUserRequest = {
  userId: string
  newRole: typeof AUTHORIZED_ROLES[number]
  dictionary: Dictionary
}

export const manageUser = async (request: PromoteUserRequest): Promise<ApiResponse<PublicUser>> => {
  const { newRole, dictionary, userId } = request
  const errors = dictionary.api.errors
  
  const isRequestValid = AUTHORIZED_ROLES.includes(newRole)
    && typeof userId === 'string'
    && typeof newRole === 'string'

  if (isRequestValid) {
    return { status: 'error', error: errors.server.badRequest }
  }

  try {
    const session = await getAuthSession()

    if (!session) {
      return { status: 'error', error: errors.server.unauthorized }
    }

    const currentUser = await prisma.user.findUnique({
      where: { id: session.user.id }
    })

    if (!currentUser) {
      return { status: 'error', error: errors.server.unauthorized }
    }

    if (!REQUIRED_ROLES.includes(currentUser.role)) {
      return { status: 'error', error: errors.server.forbidden }
    }

    const managedUser = await prisma.user.update({
      where: { publicId: userId },
      data: { role: newRole },
      select: getPublicUserSelectedFields()
    })

    if (!managedUser) {
      return { status: 'error', error: errors.user.doesntExist }
    }

    if (managedUser.role !== newRole) {
      return { status: 'error', error: errors.server.internal }
    }

    return { status: 'success', data: managedUser }
  } catch (error) {
    console.error(error)
    return { status: 'error', error: errors.server.internal }
  }
}
