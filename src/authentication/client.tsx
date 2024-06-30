'use client'

import { signOut } from 'next-auth/react'
import React from 'react'

import type { AuthenticatedUser, AuthenticationErrorCode } from '@/authentication'
import { useProvidedContext } from '@/helpers/contexts'
import type { I18n } from '@/i18n'

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

export const getAuthenticationErrorMessage = (errorCode: AuthenticationErrorCode, i18n: I18n): string => {
  switch (errorCode) {
    case 'unauthenticated':
      return i18n('authentication.errors.unauthenticated')
    case 'unauthorized':
      return i18n('authentication.errors.unauthorized')
    case 'user_not_found':
    default:
      return i18n('authentication.errors.not-found')
  }
}
