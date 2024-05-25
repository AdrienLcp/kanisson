'use client'

import React from 'react'

import { LOCALES } from '@/i18n'
import { useI18n } from '@/i18n/client'

export const LocaleSwitcher: React.FC = () => {
  const { changeLocale, currentLocale } = useI18n()

  return (
    <div>
      {LOCALES.map(locale => (
        <button
          key={locale}
          onClick={() => changeLocale(locale)}
          style={{ padding: '10px 25px', background: currentLocale === locale ? 'green' : 'red' }}
        >
          {locale}
        </button>
      ))}
    </div>
  )
}
