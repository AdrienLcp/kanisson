import { getServerSession } from 'next-auth'
import { authOptions } from '../(Routes)/api/auth/[...nextauth]/route'
import { signIn, signOut } from 'next-auth/react'

export const getAuthSession = () => {
  return getServerSession(authOptions)
}

export const getRequiredAuthSession = async () => {
  const session = await getAuthSession()

  if (!session?.user) {
    throw new Error('Session not found')
  }

  return session
}

export const login = async (callbackUrl?: string) => {
  await signIn('credentials', { callbackUrl })
}

export const logout = async (callbackUrl?: string) => {
  await signOut({ callbackUrl })
}
