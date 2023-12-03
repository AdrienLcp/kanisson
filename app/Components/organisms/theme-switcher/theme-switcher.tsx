'use client'

import { LucideIcon, Moon, Sun, SunMoon } from 'lucide-react'

import type { Theme } from '@/Types'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components'
import { useLocale, useTheme } from '@/Hooks'

import styles from './theme-switcher.styles.module.sass'

type ThemeOption = {
  key: Theme
  label: string
  Icon: LucideIcon
}

const ThemeSwitcher: React.FC = () => {
  const { selectedTheme, setTheme } = useTheme()
  const { dictionary } = useLocale()
  const strings = dictionary.components.themeSwitcher

  const themeOptions: ThemeOption[] = [
    {
      key: 'system',
      label: strings.system,
      Icon: SunMoon
    },
    {
      key: 'dark',
      label: strings.dark,
      Icon: Moon
    },
    {
      key: 'light',
      label: strings.light,
      Icon: Sun
    }
  ]

  return (
    <Select
      defaultValue={themeOptions.find(option => option.key === selectedTheme)?.key}
      onValueChange={setTheme}
    >
      <SelectTrigger>
        <SelectValue placeholder={strings.placeholder} />
      </SelectTrigger>

      <SelectContent align='start'>
        {themeOptions.map(({ key, label, Icon }) => (
          <SelectItem key={key} value={key}>
            <div className={styles['option']}>
              <Icon size='1.2em' color='hsl(var(--muted-foreground))' />
              {label}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default ThemeSwitcher
