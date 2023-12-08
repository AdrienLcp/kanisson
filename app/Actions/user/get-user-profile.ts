import type { ApiResponse, Dictionary, User } from '@/Types'
import { getPublicUserSelectedFields } from '@/Helpers'
import { getAuthSession, prisma } from '@/Lib'

type GetAuthUserRequest = {
  dictionary: Dictionary
}

export const getUserProfile = async (request: GetAuthUserRequest): Promise<ApiResponse<User>> => {
  'use server'
  
  const { dictionary } = request
  const strings = dictionary.api

  const session = await getAuthSession()

  if (!session) {
    return { status: 'error', error: strings.errors.server.unauthorized }
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: getPublicUserSelectedFields()
  })

  if (!user) {
    return { status: 'error', error: strings.errors.user.doesntExist }
  }

  if (user.status === 'banned') {
    return { status: 'error', error: strings.errors.user.banned }
  }

  return { status: 'success', data: user }
}
