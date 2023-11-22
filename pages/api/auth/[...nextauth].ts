import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/lib'
import { Provider } from 'next-auth/providers'

const googleId = process.env.GOOGLE_ID
const googleSecret = process.env.GOOGLE_SECRET

const providers: Provider[] = []

if (googleId && googleSecret) {
  providers.push(GoogleProvider({
    clientId: googleId,
    clientSecret: googleSecret
  }))
}

export const authConfig = {
  adapter: PrismaAdapter(prisma),
  callbacks: {
    session: async ({ session, user }) => {
      if (session.user) {
        session.user.id = user.id
      }
      return session
    }
  },
  providers
} satisfies NextAuthOptions

export default NextAuth(authConfig)
