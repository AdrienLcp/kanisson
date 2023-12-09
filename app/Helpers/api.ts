import type { PrivateUser, PublicUser } from '@/Types'

type PublicUserSelectedFields = Record<keyof PublicUser, true>
type PrivateUserSelectedFields = Record<keyof PrivateUser, true>

export const getPublicUserSelectedFields = (): PublicUserSelectedFields => {
  return {
    publicId: true,
    pseudo: true,
    role: true,
    status: true,
    createdAt: true,
    updatedAt: true
  }
}

export const getPrivateUserSelectedFields = (): PrivateUserSelectedFields => {
  return {
    publicId: true,
    name: true,
    pseudo: true,
    image: true,
    role: true,
    status: true,
    createdAt: true,
    updatedAt: true
  }
}
