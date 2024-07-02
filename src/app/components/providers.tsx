'use client'

import React from 'react'

import { AuthProvider } from '@/authentication/client'
import { I18nProvider } from '@/i18n'
import { ThemeProvider } from '@/theme'
import { HueProvider } from '@/theme/hue'

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => (
  <I18nProvider>
    <AuthProvider>
      <ThemeProvider>
        <HueProvider>
          {children}
        </HueProvider>
      </ThemeProvider>
    </AuthProvider>
  </I18nProvider>
)
