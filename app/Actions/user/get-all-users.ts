import type { ApiResponse, PublicUser } from '@/Types'
import { getDefaultPagination, getPublicUserSelectedFields } from '@/Helpers'
import { prisma } from '@/Lib'

type GetUsersResponse = ApiResponse<PublicUser[]>

export const getAllUsers = async (): Promise<GetUsersResponse> => {
  const users = await prisma.user.findMany({
    select: getPublicUserSelectedFields()
  })

  return {
    status: 'success',
    data: users,
    pagination: getDefaultPagination(users.length)
  }
}
