type CommonErrorCode =
  'bad_request' |
  'internal_server_error'

type ErrorCode <E extends string> = E | CommonErrorCode

type ErrorResult <E extends string> = {
  errors: Array<ErrorCode<E>>
  status: 'error'
}

type SuccessResult <T> = {
  data: T
  status: 'success'
}

export type Result <T, E extends string> = ErrorResult<E> | SuccessResult<T>

type Errors <E extends string> = Array<ErrorCode<E>> | ErrorCode<E>

export const error = <E extends string> (errors: Errors<E> = []): ErrorResult<E> => {
  const errorsList: Array<ErrorCode<E>> = []

  if (typeof errors === 'string') {
    errorsList.push(errors)
  }

  if (Array.isArray(errors)) {
    errorsList.push(...errors)
  }

  return { errors: errorsList, status: 'error' }
}

export const handleError = <E extends string> (baseError: unknown, errors: Errors<E> = []): ErrorResult<E> => {
  console.error(baseError)
  return error(errors)
}

export const success = <T> (data: T): SuccessResult<T> => {
  return { data, status: 'success' }
}
