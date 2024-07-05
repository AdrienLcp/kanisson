'use client'

import { signOut } from 'next-auth/react'
import React from 'react'

import type { AuthenticatedUser, AuthenticationErrorCode } from '@/authentication'
import { getAuthenticatedUser } from '@/authentication/actions/get-authenticated-user'
import type { UserPermission } from '@/authentication/permissions'
import { useProvidedContext } from '@/helpers/contexts'
import type { I18n } from '@/i18n'

type Authentication
  = { status: 'authenticated', authenticatedUser: AuthenticatedUser }
  | { status: 'loading' | 'unauthenticated' }

type AuthenticationContextValue = {
  authenticatedUser: AuthenticatedUser | null
  authenticatedUserPermissions: UserPermission[]
  authentication: Authentication
  logout: () => void
}

const AuthenticationContext = React.createContext<AuthenticationContextValue | null>(null)

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [authentication, setAuthentication] = React.useState<Authentication>({ status: 'loading' })

  const logout = () => {
    setAuthentication({ status: 'unauthenticated' })
    signOut()
  }

  const loadUser = React.useCallback(async () => {
    const authenticationResponse = await getAuthenticatedUser()

    if (authenticationResponse.status === 'success') {
      setAuthentication({
        status: 'authenticated',
        authenticatedUser: authenticationResponse.data
      })
      return
    }

    logout()
  }, [])

  React.useEffect(() => {
    loadUser()
  }, [loadUser])

  const authenticatedUser = authentication.status === 'authenticated'
    ? authentication.authenticatedUser
    : null

  const authenticatedUserPermissions = authenticatedUser?.permissions ?? []

  const contextValue = {
    authenticatedUser,
    authenticatedUserPermissions,
    authentication,
    logout
  }

  return (
    <AuthenticationContext.Provider value={contextValue}>
      {children}
    </AuthenticationContext.Provider>
  )
}

export const useAuthentication = () => useProvidedContext(AuthenticationContext, 'Authentication')

type UserHookValue = {
  authenticatedUser: AuthenticatedUser
}

export const useUser = (): UserHookValue => {
  const { authentication } = useAuthentication()

  if (authentication.status !== 'authenticated') {
    throw new Error('User needs to be authenticated to use this hook')
  }

  return { authenticatedUser: authentication.authenticatedUser }
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
