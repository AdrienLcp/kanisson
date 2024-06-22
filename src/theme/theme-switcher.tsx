'use client'

import { MoonIcon, SunIcon, SunMoonIcon } from 'lucide-react'
import React from 'react'

import type { Option } from '@/components/option-item'
import { Select } from '@/components/select'
import type { I18n } from '@/i18n'
import { useI18n } from '@/i18n/client'
import { type Theme, useTheme } from '@/theme'

const getThemesOptions = (i18n: I18n) => {
  const themesOptionsConfig: Array<Option<Theme>> = [
    {
      key: 'system',
      label: i18n('theme.dark-mode.modes.system'),
      Icon: SunMoonIcon
    },
    {
      key: 'dark',
      label: i18n('theme.dark-mode.modes.dark'),
      Icon: MoonIcon
    },
    {
      key: 'light',
      label: i18n('theme.dark-mode.modes.light'),
      Icon: SunIcon
    }
  ]

  return themesOptionsConfig
}

export const ThemeSwitcher: React.FC = () => {
  const { i18n } = useI18n()
  const { changeTheme, currentTheme } = useTheme()

  const themesOptions = getThemesOptions(i18n)

  return (
    <Select
      items={themesOptions}
      label={i18n('theme.dark-mode.title')}
      placeholder={i18n('theme.dark-mode.subtitle')}
      onSelect={(option) => { changeTheme(option.key) }}
      selectedKey={currentTheme}
    />
  )
}
