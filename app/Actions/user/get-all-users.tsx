import prisma from '@/Lib/prisma'
import { getAuthSession } from '@/Lib'

type GetUsersRequest = {

}

export const getAllUsers = async () => {
  const session = await getAuthSession()

  const users = await prisma.user.findMany()

  return users
}
