import type { DefaultSession } from 'next-auth'
import type { User } from '@/user'

declare module 'next-auth' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Session extends DefaultSession {
    user: User
  }
}
