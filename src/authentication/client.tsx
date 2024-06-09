'use client'

import { signOut } from 'next-auth/react'
import React from 'react'

import type { AuthenticatedUser } from '@/authentication'
import { useProvidedContext } from '@/helpers/contexts'

type Authentication =
  { status: 'authenticated', authenticatedUser: AuthenticatedUser } |
  { status: 'loading' } |
  { status: 'unauthenticated' }

type AuthenticationContextValue = {
  authentication: Authentication
  logout: () => void
}

export type AuthProviderProps = React.PropsWithChildren & {
  authenticatedUser: AuthenticatedUser | null
}

const AuthenticationContext = React.createContext<AuthenticationContextValue | null>(null)

export const AuthProvider: React.FC<AuthProviderProps> = ({ children, authenticatedUser }) => {
  const [authentication, setAuthentication] = React.useState<Authentication>({ status: 'loading' })

  const logout = () => {
    setAuthentication({ status: 'unauthenticated' })
    signOut()
  }

  React.useEffect(() => {
    if (authenticatedUser === null) {
      setAuthentication({ status: 'unauthenticated' })
      return
    }

    setAuthentication({ status: 'authenticated', authenticatedUser })
  }, [authenticatedUser])

  return (
    <AuthenticationContext.Provider value={{ authentication, logout }}>
      {children}
    </AuthenticationContext.Provider>
  )
}

export const useAuthentication = () => useProvidedContext(AuthenticationContext, 'Authentication')

type UserHookValue = {
  authUser: AuthenticatedUser
}

export const useUser = (): UserHookValue => {
  const { authentication } = useAuthentication()

  if (authentication.status !== 'authenticated') {
    throw new Error('User needs to be authenticated to use this hook')
  }

  return { authUser: authentication.authenticatedUser }
}
