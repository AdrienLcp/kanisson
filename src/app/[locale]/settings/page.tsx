'use client'

import React from 'react'

import { Button } from '@/components/button'
import { Dropdown } from '@/components/dropdown'
import type { Option } from '@/components/option-item'
import type { Locale } from '@/i18n'
import { useI18n } from '@/i18n/client'
import { type Theme, useTheme } from '@/theme'

const ParamsPage: React.FC = () => {
  const { changeLocale } = useI18n()
  const { changeTheme } = useTheme()

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
      <Dropdown
        items={localeOptions}
        onClickItem={(item) => { changeLocale(item.id) }}
      >
        <Button>
          Locale
        </Button>
      </Dropdown>

      <Dropdown
        items={themesOptions}
        onClickItem={(item) => { changeTheme(item.id) }}
      >
        <Button>
          Theme
        </Button>
      </Dropdown>
    </>
  )
}

export default ParamsPage
