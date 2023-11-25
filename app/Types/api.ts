import { Session } from 'next-auth'

type ApiSuccessResponse<T> = {
  data: T
}

type ApiErrorResponse = {
  error: string
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse

export type User = NonNullable<Session['user']>
