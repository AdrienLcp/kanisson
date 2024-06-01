'use client'

import React from 'react'

import { useProvidedContext } from '@/helpers/contexts'

type User = ''

type AuthenticatedUser = {
  status: 'authenticated'
  user: User
}

type LoadingUser = {
  status: 'loading'
}

type UnauthenticatedUser = {
  status: 'unauthenticated'
}

type Auth = AuthenticatedUser | LoadingUser | UnauthenticatedUser

type AuthContextValue = {
  auth: Auth
  logout: () => void
}

const DEFAULT_AUTH: Auth = { status: 'loading' }

const AuthContext = React.createContext<AuthContextValue | null>(null)

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [auth, setAuth] = React.useState<Auth>(DEFAULT_AUTH)

  const logout = () => {
    setAuth({ status: 'unauthenticated' })
  }

  return (
    <AuthContext.Provider value={{ auth, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useProvidedContext(AuthContext, 'Auth')

type UserHookValue = {
  user: User
}

export const useUser = (): UserHookValue => {
  const { auth } = useAuth()

  if (auth.status !== 'authenticated') {
    throw new Error('User needs to be authenticated to use this hook')
  }

  return { user: auth.user }
}
