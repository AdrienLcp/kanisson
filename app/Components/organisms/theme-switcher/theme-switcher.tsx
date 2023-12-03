'use client'

import { LucideIcon, Moon, Sun, SunMoon } from 'lucide-react'

import type { Theme } from '@/Types'
import { useLocale, useTheme } from '@/Hooks'
import { Button, DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/Components'

import styles from './theme-switcher.styles.module.sass'

type ThemeOption = {
  key: Theme
  label: string
  Icon: LucideIcon
}

const ThemeSwitcher: React.FC = () => {
  const { isDarkModeActive, selectedTheme, setTheme } = useTheme()
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
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button className={styles['dropdown__trigger']} variant='outline'>
          {isDarkModeActive
            ? <Moon size='1.4em' />
            : <Sun size='1.4em' />
          }

          {themeOptions.find(option => option.key === selectedTheme)?.label}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='start'>
        {themeOptions.map(({ key, label, Icon }) => (
          <DropdownMenuCheckboxItem
            key={key}
            checked={selectedTheme === key}
            className={styles['dropdown__option']}
            onClick={() => setTheme(key)}
          >
            {label} <Icon size='1.2em' color='hsl(var(--muted-foreground))' />
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ThemeSwitcher
