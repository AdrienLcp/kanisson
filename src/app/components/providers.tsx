'use client'

import React from 'react'

import { AuthProvider, type AuthProviderProps } from '@/authentication/client'
import { I18nProvider } from '@/i18n'
import { ThemeProvider } from '@/theme'
import { HueProvider } from '@/theme/hue'

type ProvidersProps = AuthProviderProps & React.PropsWithChildren

export const Providers: React.FC<ProvidersProps> = ({ authenticatedUser, children }) => (
  <I18nProvider>
    <AuthProvider authenticatedUser={authenticatedUser}>
      <ThemeProvider>
        <HueProvider>
          {children}
        </HueProvider>
      </ThemeProvider>
    </AuthProvider>
  </I18nProvider>
)
