import type { User } from '@/Types'
import { getAuthSession, prisma } from '@/Lib'
import { getPublicUserSelectedFields } from '@/Helpers'

export const getAuthUser = async (): Promise<User | null> => {
  const session = await getAuthSession()

  if (!session) {
    return null
  }

  // return error etc

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: getPublicUserSelectedFields()
  })

  return user
}
