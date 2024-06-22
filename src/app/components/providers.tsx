'use client'

import React from 'react'

import { AuthProvider, type AuthProviderProps } from '@/authentication/client'
import { I18nProvider, type I18nProviderProps } from '@/i18n/client'
import { ThemeProvider } from '@/theme'
import { HueProvider } from '@/theme/hue'

type ProvidersProps =
  AuthProviderProps &
  I18nProviderProps &
  React.PropsWithChildren

export const Providers: React.FC<ProvidersProps> = ({ authenticatedUser, children, dictionary, locale }) => (
  <I18nProvider dictionary={dictionary} locale={locale}>
    <AuthProvider authenticatedUser={authenticatedUser}>
      <ThemeProvider>
        <HueProvider>
          {children}
        </HueProvider>
      </ThemeProvider>
    </AuthProvider>
  </I18nProvider>
)
