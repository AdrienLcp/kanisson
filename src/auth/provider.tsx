'use client'

import React from 'react'

import type { AuthUser } from '@/auth'
import { AuthProvider } from '@/auth/client'

type AuthProviderProps = React.PropsWithChildren & {
  user: AuthUser | null
}

export const AuthProviders: React.FC<AuthProviderProps> = ({ children, user }) => (
  <AuthProvider user={user}>
    {children}
  </AuthProvider>
)
