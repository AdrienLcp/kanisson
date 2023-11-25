import NextAuth, { type NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import prisma from '@/Lib/prisma'

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? '',
      clientSecret: process.env.GOOGLE_SECRET ?? ''
    })
  ],
  callbacks: {
    session: async ({ session, user }) => {
      session.user.id = user.id
      return session
    }
  }
} satisfies NextAuthOptions

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
