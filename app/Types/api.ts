import type { User as PrismaUser } from '@prisma/client'

export type PaginationRequest = {
  limit: number
  page: number
}

export type PaginationResponse = PaginationRequest & {
  total: number
}

type ApiSuccessResponse<T> = {
  data: T
  pagination?: PaginationResponse
}

type ApiErrorResponse = {
  error: string
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse

export type ApiRequest<T = {}> = {
  request: T
  pagination?: PaginationRequest
}

export type User = Omit<PrismaUser, 'id' | 'email' | 'emailVerified' | 'accounts' | 'sessions'>
