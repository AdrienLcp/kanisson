'use server'

import type { ApiResponse, Dictionary, PrivateUser } from '@/Types'
import { getPrivateUserSelectedFields } from '@/Helpers'
import { getAuthSession, prisma } from '@/Lib'

type GetUserProfileRequest = {
  dictionary: Dictionary
}

type GetUserProfileResponse = ApiResponse<PrivateUser>

export const getUserProfile = async (request: GetUserProfileRequest): Promise<GetUserProfileResponse> => {
  const { dictionary } = request
  const strings = dictionary.api

  const session = await getAuthSession()

  if (!session) {
    return { status: 'error', error: strings.errors.server.unauthorized }
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: getPrivateUserSelectedFields()
  })

  if (!user) {
    return { status: 'error', error: strings.errors.user.doesntExist }
  }

  if (user.status === 'banned') {
    return { status: 'error', error: strings.errors.user.banned }
  }

  return { status: 'success', data: user }
}
