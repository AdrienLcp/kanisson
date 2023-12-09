'use server'

import type { ApiResponse, Dictionary, PrivateUser } from '@/Types'
import { getAuthSession, prisma } from '@/Lib'
import { getPrivateUserSelectedFields } from '@/Helpers'

type UpdateUserRequest = {
  username: string
  dictionary: Dictionary
}

type UpdateUserResponse = ApiResponse<PrivateUser>

export const updateUsername = async (request: UpdateUserRequest): Promise<UpdateUserResponse> => {
  const { username, dictionary } = request
  const strings = dictionary.api
  
  const session = await getAuthSession()

  if (!session) {
    return { status: 'error', error: strings.errors.server.unauthorized }
  }

  const updatedUser = await prisma.user.update({
    where: { id: session.user.id },
    data: { pseudo: username },
    select: getPrivateUserSelectedFields()
  })

  if (!updatedUser) {
    return { status: 'error', error: strings.errors.user.doesntExist }
  }

  if (updatedUser.status === 'banned') {
    return { status: 'error', error: strings.errors.user.banned }
  }

  return { status: 'success', data: updatedUser }
}
