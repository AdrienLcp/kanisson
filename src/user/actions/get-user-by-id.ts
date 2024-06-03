
import prisma from '@/lib/prisma'
import { isValidUserRole, PUBLIC_USER_SELECTED_FIELDS, type UserRole, type User } from '@/user'
import { getUserPermissions } from '@/user/permissions'

export const getUserById = async (id: string): Promise<User | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: PUBLIC_USER_SELECTED_FIELDS
    })

    if (user === null) {
      return null
    }

    const userRole: UserRole = isValidUserRole(user.role)
      ? user.role
      : 'user'

    const publicUser: User = {
      id: user.id,
      email: user.email,
      name: user.name,
      image: user.image,
      pseudo: user.pseudo,
      status: user.status,
      role: userRole,
      permissions: getUserPermissions(userRole),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }

    return publicUser
  } catch (error) {
    console.error(error)
    return null
  }
}
