import prisma from '@/lib/prisma'
import { getValidRole, type PublicUser, PUBLIC_USER_SELECTED_FIELDS, type UserRole } from '@/user'

export const getUserById = async (id: string): Promise<PublicUser | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: PUBLIC_USER_SELECTED_FIELDS
    })

    if (user === null) {
      return null
    }

    const userRole: UserRole = getValidRole(user.role)

    const publicUser: PublicUser = {
      avatar: user.avatar,
      id: user.id,
      pseudo: user.pseudo,
      role: userRole,
      createdAt: user.createdAt,
      games: user.games,
      playlists: user.playlists
    }

    return publicUser
  } catch (error) {
    console.error(error)
    return null
  }
}
