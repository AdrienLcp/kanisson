import type { PrivateUser } from '@/Types'
import { getAuthSession, prisma } from '@/Lib'
import { getPrivateUserSelectedFields } from '@/Helpers'

export const getAuthUser = async (): Promise<PrivateUser | null> => {
  const session = await getAuthSession()

  if (!session) {
    return null
  }

  // return error etc

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: getPrivateUserSelectedFields()
  })

  return user
}
