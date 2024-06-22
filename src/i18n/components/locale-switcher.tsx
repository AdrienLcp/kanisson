'use client'

import React from 'react'

import type { Option } from '@/components/option-item'
import { Select } from '@/components/select'
import type { Locale } from '@/i18n'
import { useI18n } from '@/i18n/client'

const localeOptions: Array<Option<Locale>> = [
  {
    key: 'fr',
    label: 'Français'
  },
  {
    key: 'en',
    label: 'English'
  }
]

export const LocaleSwitcher: React.FC = () => {
  const { changeLocale, currentLocale } = useI18n()

  return (
    <Select
      items={localeOptions}
      label='Language'
      onSelect={(option) => { changeLocale(option.key) }}
      selectedKey={currentLocale}
    />
  )
}
