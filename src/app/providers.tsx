'use client'

import React from 'react'

import { I18nProvider, type I18nProviderProps } from '@/i18n/client'

type ProvidersProps = React.PropsWithChildren & I18nProviderProps

export const Providers: React.FC<ProvidersProps> = ({ children, dictionary, locale }) => (
  <I18nProvider dictionary={dictionary} locale={locale}>
    {children}
  </I18nProvider>
)
