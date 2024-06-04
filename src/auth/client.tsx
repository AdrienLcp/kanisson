'use client'

import { signOut } from 'next-auth/react'
import React from 'react'

import type { AuthUser } from '@/auth'
import { useProvidedContext } from '@/helpers/contexts'

type Auth =
  { status: 'authenticated', user: AuthUser } |
  { status: 'loading' } |
  { status: 'unauthenticated' }

type AuthContextValue = {
  auth: Auth
  logout: () => void
}

export type AuthProviderProps = React.PropsWithChildren & {
  user: AuthUser | null
}

const AuthContext = React.createContext<AuthContextValue | null>(null)

export const AuthProvider: React.FC<AuthProviderProps> = ({ children, user }) => {
  const [auth, setAuth] = React.useState<Auth>({ status: 'loading' })

  const logout = () => {
    setAuth({ status: 'unauthenticated' })
    signOut()
  }

  React.useEffect(() => {
    if (user === null) {
      setAuth({ status: 'unauthenticated' })
      return
    }

    setAuth({ status: 'authenticated', user })
  }, [user])

  return (
    <AuthContext.Provider value={{ auth, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useProvidedContext(AuthContext, 'Auth')

type UserHookValue = {
  user: AuthUser
}

export const useUser = (): UserHookValue => {
  const { auth } = useAuth()

  if (auth.status !== 'authenticated') {
    throw new Error('User needs to be authenticated to use this hook')
  }

  return { user: auth.user }
}
