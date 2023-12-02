import type { ApiResponse, User } from '@/Types'
import { getDefaultPagination, getPublicUserSelectedFields } from '@/Helpers'
import { prisma } from '@/Lib'

type GetUsersResponse = ApiResponse<User[]>

export const getAllUsers = async (): Promise<GetUsersResponse> => {
  const users = await prisma.user.findMany({
    select: getPublicUserSelectedFields()
  })

  return {
    data: users,
    pagination: getDefaultPagination(users.length)
  }
}
