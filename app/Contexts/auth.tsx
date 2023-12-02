'use client'

import { createContext } from 'react'

import type { User } from '@/Types'

type AuthContextProps = React.PropsWithChildren<{
  user: User | null
}>

type AuthContext = {
  user: User | null
}

export const AuthContext = createContext<AuthContext | null>(null)

export const AuthProvider: React.FC<AuthContextProps> = ({ children, user }) => (
  <AuthContext.Provider value={{ user }}>
    {children}
  </AuthContext.Provider>
)
