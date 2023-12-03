'use client'

import { SessionProvider } from 'next-auth/react'

import { TooltipProvider } from '@root/app/Components/base/ui/tooltip'

import type { Dictionary, User } from '@/Types'
import { AuthProvider, HueProvider, LocaleProvider, ThemeProvider } from '@/Contexts'

type ProvidersProps = React.PropsWithChildren & {
  user: User | null
  dictionary: Dictionary
}

const Providers: React.FC<ProvidersProps> = ({ user, dictionary, children }) => (
  <SessionProvider>
    <AuthProvider user={user}>
      <LocaleProvider dictionary={dictionary}>
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
