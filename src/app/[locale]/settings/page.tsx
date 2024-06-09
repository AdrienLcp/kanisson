'use client'

import React from 'react'
import { Menu, MenuItem, MenuTrigger } from 'react-aria-components'

import { OptionItem, type Option } from '@/components/option-item'
import { getRedirectPathname, type Locale } from '@/i18n'
import { Button } from '@/components/button'
import { Popover } from '@/components/popover'
import { usePathname, useRouter } from 'next/navigation'
import { type Theme, useTheme } from '@/theme'

const ParamsPage: React.FC = () => {
  const pathname = usePathname()
  const router = useRouter()

  const { changeTheme } = useTheme()

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

  const themesOptions: Array<Option<Theme>> = [
    {
      key: 'system',
      label: 'System'
    },
    {
      key: 'dark',
      label: 'Dark'
    },
    {
      key: 'light',
      label: 'Light'
    }
  ]

  const handleChangeLocale = (locale: Locale) => {
    const newPathname = getRedirectPathname(pathname, locale)
    router.push(newPathname)
  }

  return (
    <>
      <MenuTrigger>
        <Button>
          Locale
        </Button>

        <Popover>
          <Menu items={localeOptions}>
            {(item) => (
              <MenuItem onAction={() => handleChangeLocale(item.key)}>
                <OptionItem
                  key={item.key}
                  label={item.label}
                />
              </MenuItem>
            )}
          </Menu>
        </Popover>
      </MenuTrigger>

      <MenuTrigger>
        <Button>
          Theme
        </Button>

        <Popover>
          <Menu items={themesOptions}>
            {(item) => (
              <MenuItem onAction={() => {
                console.log('changeTheme', item.key)
                changeTheme(item.key)
              }}>
                <OptionItem
                  key={item.key}
                  label={item.label}
                />
              </MenuItem>
            )}
          </Menu>
        </Popover>
      </MenuTrigger>
    </>
  )
}

export default ParamsPage
