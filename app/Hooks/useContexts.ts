'use client'

import { useContext } from 'react'

const useValidContext = <T>(currentContext: React.Context<T>, contextName: string) => {
  const context = useContext(currentContext)

  if (context === null) {
    throw new Error(`Missing ${contextName} context provider React node in app definition`)
  }

  return context
}
