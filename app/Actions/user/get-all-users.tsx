import prisma from '@/Lib/prisma'

type GetUsersRequest = {

}

export const getAllUsers = async () => {
  const users = prisma.user.findMany({
    select: {
      name: true,
      role: true
    }
  })

  return users
}
