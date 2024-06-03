'use client'

import React from 'react'

import { AuthProvider, type AuthProviderProps } from '@/auth/client'
import { I18nProvider, type I18nProviderProps } from '@/i18n/client'
import { ThemeProvider } from '@/theme'
import { HueProvider } from '@/theme/hue'

type ProvidersProps =
  AuthProviderProps &
  I18nProviderProps &
  React.PropsWithChildren

export const Providers: React.FC<ProvidersProps> = ({ children, dictionary, locale, user }) => (
  <I18nProvider dictionary={dictionary} locale={locale}>
    <AuthProvider user={user}>
      <ThemeProvider>
        <HueProvider>
          {children}
        </HueProvider>
      </ThemeProvider>
    </AuthProvider>
  </I18nProvider>
)
