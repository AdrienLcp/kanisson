'use client'

import React from 'react'

import type { Option } from '@/components/option-item'
import { Select } from '@/components/forms/select'
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
  const { changeLocale, currentLocale, i18n } = useI18n()

  return (
    <section>
      <Select
        items={localeOptions}
        label={i18n('i18n.label')}
        onSelect={(option) => { changeLocale(option.key) }}
        placeholder={i18n('i18n.placeholder')}
        selectedKey={currentLocale}
      />
    </section>
  )
}
