'use client'

import React from 'react'

import type { Option } from '@/components/option-item'
import type { Locale } from '@/i18n'
import { useI18n } from '@/i18n/client'
import { type Theme, useTheme } from '@/theme'
import { Select } from '@/components/select'
import { HueSwitcher } from '@/theme/hue-switcher'

const ParamsPage: React.FC = () => {
  const { changeLocale, currentLocale } = useI18n()
  const { changeTheme, currentTheme } = useTheme()

  const localeOptions: Array<Option<Locale>> = [
    {
      id: 'fr',
      label: 'Français'
    },
    {
      id: 'en',
      label: 'English'
    }
  ]

  const themesOptions: Array<Option<Theme>> = [
    {
      id: 'system',
      label: 'System'
    },
    {
      id: 'dark',
      label: 'Dark'
    },
    {
      id: 'light',
      label: 'Light'
    }
  ]

  return (
    <>
      <Select
        items={localeOptions}
        label='Language'
        onSelect={(option) => { changeLocale(option.id) }}
        selectedKey={currentLocale}
      />

      <Select
        items={themesOptions}
        label='Theme'
        onSelect={(option) => { changeTheme(option.id) }}
        selectedKey={currentTheme}
      />

      <HueSwitcher />
    </>
  )
}

export default ParamsPage
