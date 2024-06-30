import type { I18n } from '@/i18n'

export type CommonErrorCode =
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

export const handleUnknownError = (baseError: unknown): ErrorResult<CommonErrorCode> => {
  console.error(baseError)
  return error('internal_server_error')
}

export const success = <T> (data: T): SuccessResult<T> => {
  return { data, status: 'success' }
}

export const getCommonErrorMessage = (errorCode: CommonErrorCode, i18n: I18n): string => {
  switch (errorCode) {
    case 'bad_request':
      return i18n('errors.bad-request')
    case 'internal_server_error':
    default:
      return i18n('errors.internal-server-error')
  }
}
