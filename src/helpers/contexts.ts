import React from 'react'

export const useProvidedContext = <T> (context: React.Context<T | null>, name?: string) => {
  const currentContext = React.useContext(context)

  if (currentContext === null) {
    const errorMessageSuffix = 'provider context is missing'
    const errorMessagePrefix = name !== undefined
      ? name
      : 'A'

    throw new Error(`${errorMessagePrefix} ${errorMessageSuffix}`)
  }

  return currentContext
}
