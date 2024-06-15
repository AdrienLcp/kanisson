'use client'

import React from 'react'
import { Menu, MenuItem, MenuTrigger } from 'react-aria-components'

import { OptionItem, type Option } from '@/components/option-item'
import type { Locale } from '@/i18n'
import { Button } from '@/components/button'
import { Popover } from '@/components/popover'
import { type Theme, useTheme } from '@/theme'
import { useI18n } from '@/i18n/client'

const ParamsPage: React.FC = () => {
  const { changeTheme } = useTheme()
  const { changeLocale } = useI18n()

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
      <MenuTrigger>
        <Button>
          Locale
        </Button>

        <Popover>
          <Menu items={localeOptions}>
            {(item) => (
              <MenuItem onAction={() => changeLocale(item.id)}>
                <OptionItem
                  id={item.id}
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
              <MenuItem onAction={() => changeTheme(item.id)}>
                <OptionItem
                  id={item.id}
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
