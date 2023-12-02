import type { User } from '@/Types'
import { getAuthSession, prisma } from '@/Lib'

export const getAuthUser = async (): Promise<User | null> => {
  const session = await getAuthSession()

  if (!session) {
    return null
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id
    },
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

  return user
}
