'use client'

import React from 'react'

import { I18nProvider, type I18nProviderProps } from '@/i18n/client'
import { ThemeProvider } from '@/theme'
import { HueProvider } from '@/theme/hue'

type ProvidersProps = React.PropsWithChildren & I18nProviderProps

export const Providers: React.FC<ProvidersProps> = ({ children, dictionary, locale }) => (
  <I18nProvider dictionary={dictionary} locale={locale}>
    <ThemeProvider>
      <HueProvider>
        {children}
      </HueProvider>
    </ThemeProvider>
  </I18nProvider>
)
