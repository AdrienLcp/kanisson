import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth, { getServerSession, type NextAuthOptions } from 'next-auth'
import type { Adapter } from 'next-auth/adapters'
import GoogleProvider from 'next-auth/providers/google'

import { env } from '@/env'
import prisma from '@/lib/prisma'

const authConfig = {
  adapter: PrismaAdapter(prisma) as Adapter,
  callbacks: {
    session: async ({ session, user }) => {
      if (session.user !== undefined) {
        session.user.id = user.id
      }

      return session
    }
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_ID,
      clientSecret: env.GOOGLE_SECRET
    })
  ]
} satisfies NextAuthOptions

export default NextAuth(authConfig)

export const getAuthSession = async () => {
  return getServerSession(authConfig)
}
