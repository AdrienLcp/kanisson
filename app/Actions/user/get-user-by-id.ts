import type { ApiResponse, Dictionary, PublicUser } from '@/Types'
import { getPublicUserSelectedFields } from '@/Helpers'
import { getAuthSession, prisma } from '@/Lib'

type GetAuthUserRequest = {
  userId: string
  dictionary: Dictionary
}

export const getUserProfile = async (request: GetAuthUserRequest): Promise<ApiResponse<PublicUser>> => {
  'use server'
  
  const { dictionary, userId } = request
  const strings = dictionary.api

  const session = await getAuthSession()

  if (!session) {
    return { status: 'error', error: strings.errors.server.unauthorized }
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
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
