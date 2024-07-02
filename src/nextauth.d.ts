import type { DefaultSession } from 'next-auth'
import type { AuthenticatedUser } from '@/authentication'

declare module 'next-auth' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Session extends DefaultSession {
    user: AuthenticatedUser
  }
}
