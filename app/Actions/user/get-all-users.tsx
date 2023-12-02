import type { ApiResponse, User } from '@/Types'
import { getDefaultPagination } from '@/Helpers'
import { prisma } from '@/Lib'

type GetUsersResponse = ApiResponse<User[]>

export const getAllUsers = async (): Promise<GetUsersResponse> => {
  const users = await prisma.user.findMany({
    select: {
      publicId: true,
      name: true,
      pseudo: true,
      image: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true
    }
  })

  return {
    data: users,
    pagination: getDefaultPagination(users.length)
  }
}
