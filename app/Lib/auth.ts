import { getServerSession } from 'next-auth'
import { authOptions } from '../(Routes)/api/auth/[...nextauth]/route'

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
