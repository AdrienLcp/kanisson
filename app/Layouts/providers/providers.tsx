'use client'

import { SessionProvider } from 'next-auth/react'

import type { Dictionary } from '@/Types'
import { HueProvider, LocaleProvider, ThemeProvider } from '@/Contexts'

type ProvidersProps = React.PropsWithChildren & {
  strings: Dictionary
}

const Providers: React.FC<ProvidersProps> = ({ strings, children }) => (
  <SessionProvider>
    <LocaleProvider strings={strings}>
      <HueProvider>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </HueProvider>
    </LocaleProvider>
  </SessionProvider>
)

export default Providers
