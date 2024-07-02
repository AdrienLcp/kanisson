import toast from 'react-hot-toast'

import type { I18n } from '@/i18n'
import { type CommonErrorCode, error, type ErrorResult } from './result'

export const handleUnknownClientError = (error: unknown, i18n: I18n) => {
  console.error(error)
  toast.error(i18n('errors.internal-server-error'))
}

export const handleUnknownServerError = (baseError: unknown): ErrorResult<CommonErrorCode> => {
  console.error(baseError)
  return error('internal_server_error')
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
