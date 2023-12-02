import type { User } from '@/Types'

type PublicUserSelectedFields = Record<keyof User, true>

export const getPublicUserSelectedFields = (): PublicUserSelectedFields => {
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