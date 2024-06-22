import type { Locale } from '@/i18n'

export type BaseRequest = {
  locale: Locale
}

type ErrorResult = {
  error: {
    message: string
  }
  status: 'error'
}

type SuccessResult <T> = {
  data: T
  status: 'success'
}

export type Result <T> = ErrorResult | SuccessResult<T>
