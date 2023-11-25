'use client'

import { SessionProvider } from 'next-auth/react'

import { ThemeProvider } from '@/Contexts'

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => (
  <SessionProvider>
    <ThemeProvider>
      {children}
    </ThemeProvider>
  </SessionProvider>
)
