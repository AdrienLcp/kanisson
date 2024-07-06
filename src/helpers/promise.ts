export const notAwaited = <T>(promise: Promise<T>): void => {
  void promise.catch((error) => {
    console.error('Unhandled promise rejection:', error)
  })
}

export const sleep = (delay: number) => {
  return new Promise((resolve) => setTimeout(resolve, delay))
}
