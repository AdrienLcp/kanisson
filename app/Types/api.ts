import type { User } from '@prisma/client'

export type PaginationRequest = {
  limit: number
  page: number
}

export type PaginationResponse = PaginationRequest & {
  total: number
}

type ApiSuccessResponse<T> = {
  status: 'success'
  data: T
  pagination?: PaginationResponse
}

type ApiErrorResponse = {
  status: 'error'
  error: string
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse

export type ApiRequest<T> = {
  request: T
  pagination?: PaginationRequest
}

// Private user is for an auth user, he can see his name & his image for example
export type PrivateUser = Omit<User, 'id' | 'email' | 'emailVerified'>

// Public user if for guests & others users, for example, they can't see google image of other users
export type PublicUser = Omit<PrivateUser, 'image' | 'name'>
