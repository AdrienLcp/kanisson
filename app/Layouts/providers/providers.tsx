'use client'

import { SessionProvider } from 'next-auth/react'

import type { Dictionary, PublicUser } from '@/Types'
import { AuthProvider, HueProvider, LocaleProvider, ThemeProvider } from '@/Contexts'

type ProvidersProps = React.PropsWithChildren & {
  user: PublicUser | null
  strings: Dictionary
}

const Providers: React.FC<ProvidersProps> = ({ user, strings, children }) => (
  <SessionProvider>
    <AuthProvider user={user}>
      <LocaleProvider strings={strings}>
        <HueProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </HueProvider>
      </LocaleProvider>
    </AuthProvider>
  </SessionProvider>
)

export default Providers
