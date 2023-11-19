import { useContext } from 'react'

const useValidContext = <T>(currentContext: React.Context<T>, contextName: string) => {
  const context = useContext(currentContext)

  if (context === null) {
    throw new Error(`${contextName} context provider React node is missing in app definition`)
  }

  return context
}
