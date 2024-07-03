'use client'

import React from 'react'

import { AuthProvider } from '@/authentication/client'
import { I18nProvider } from '@/i18n/client'
import { ThemeProvider } from '@/theme'
import { HueProvider } from '@/theme/hue'

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => (
  <AuthProvider>
    <I18nProvider>
      <ThemeProvider>
        <HueProvider>
          {children}
        </HueProvider>
      </ThemeProvider>
    </I18nProvider>
  </AuthProvider>
)
