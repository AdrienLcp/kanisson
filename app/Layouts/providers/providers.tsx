'use client'

import { SessionProvider } from 'next-auth/react'

import { TooltipProvider } from '@root/app/Components/base/ui/tooltip'

import type { Dictionary, User } from '@/Types'
import { AuthProvider, HueProvider, LocaleProvider, ThemeProvider } from '@/Contexts'

type ProvidersProps = React.PropsWithChildren & {
  user: User | null
  strings: Dictionary
}

const Providers: React.FC<ProvidersProps> = ({ user, strings, children }) => (
  <SessionProvider>
    <AuthProvider user={user}>
      <LocaleProvider strings={strings}>
        <HueProvider>
          <ThemeProvider>
            <TooltipProvider>
              {children}
            </TooltipProvider>
          </ThemeProvider>
        </HueProvider>
      </LocaleProvider>
    </AuthProvider>
  </SessionProvider>
)

export default Providers
