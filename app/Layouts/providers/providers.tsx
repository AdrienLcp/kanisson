'use client'

import { SessionProvider } from 'next-auth/react'

import { HueProvider, ThemeProvider } from '@/Contexts'

const Providers: React.FC<React.PropsWithChildren> = ({ children }) => (
  <SessionProvider>
    <HueProvider>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </HueProvider>
  </SessionProvider>
)

export default Providers
