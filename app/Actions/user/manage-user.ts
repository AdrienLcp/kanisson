import type { UserRole } from '@prisma/client'

import type { ApiResponse, Dictionary, User } from '@/Types'
import { getPublicUserSelectedFields } from '@/Helpers'
import { getAuthSession, prisma } from '@/Lib'

type PromoteUserRequest = {
  userId: string
  newRole: 'moderator' | 'user'
  strings: Dictionary
}

const AUTHORIZED_NEW_ROLES: UserRole[] = ['moderator', 'user']
const AUTHORIZED_EDITOR_ROLES: UserRole[] = ['moderator', 'admin']

export const manageUser = async (request: PromoteUserRequest): Promise<ApiResponse<User>> => {
  const { newRole, strings, userId } = request

  try {
    if (!AUTHORIZED_NEW_ROLES.includes(newRole) || typeof userId !== 'string' || typeof newRole !== 'string') {
      return { error: strings.api.errors.server.badRequest }
    }

    const session = await getAuthSession()

    if (!session) {
      return { error: strings.api.errors.server.unauthorized }
    }

    const currentUser = await prisma.user.findUnique({
      where: { id: session.user.id }
    })

    if (!currentUser) {
      return { error: strings.api.errors.server.unauthorized }
    }

    if (!AUTHORIZED_EDITOR_ROLES.includes(currentUser.role)) {
      return { error: strings.api.errors.server.forbidden }
    }

    const managedUser = await prisma.user.update({
      where: { publicId: userId },
      data: { role: newRole },
      select: getPublicUserSelectedFields()
    })

    if (!managedUser) {
      return { error: strings.api.errors.user.doesnt_exist }
    }

    if (managedUser.role !== newRole) {
      return { error: strings.api.errors.server.internal }
    }

    return { data: managedUser }
  } catch (error) {
    console.error(error)
    return { error: strings.api.errors.server.internal }
  }
}
