import { getArrayFromStrings } from './strings'

export type CommonErrorCode
  = 'bad_request'
  | 'internal_server_error'
  | 'not_found'

type ErrorCode <E extends string> = E | CommonErrorCode

export type ErrorResult <E extends string> = {
  errors: Array<ErrorCode<E>>
  status: 'error'
}

type SuccessResult <T> = {
  data: T
  status: 'success'
}

export type Result <T, E extends string = CommonErrorCode> = ErrorResult<E> | SuccessResult<T>

type Errors <E extends string> = Array<ErrorCode<E>> | ErrorCode<E>

export const error = <E extends string> (errors: Errors<E> = []): ErrorResult<E> => {
  const errorsList = getArrayFromStrings(errors)
  console.error(errorsList)
  return { errors: errorsList, status: 'error' }
}

export const success = <T> (data: T): SuccessResult<T> => {
  return { data, status: 'success' }
}
