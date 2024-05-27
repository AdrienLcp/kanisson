export type ErrorResult = {
  error: {
    message: string
  }
  status: 'error'
}

export type SuccessResult <T> = {
  data: T
  status: 'success'
}

export type Result <T> = ErrorResult | SuccessResult<T>
