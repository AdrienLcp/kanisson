'use client'

import React from 'react'
import { Menu, MenuItem } from 'react-aria-components'

import { useAuth } from '@/authentication/client'
import { type Option, OptionItem } from '@/components/option-item'
import type { I18n } from '@/i18n'
import { useI18n } from '@/i18n/client'

import './authenticated-user-menu-actions.styles.sass'
import { LogOutIcon, MailIcon, SettingsIcon, UserIcon } from 'lucide-react'

const getAuthenticatedUserMenuActions = (i18n: I18n, logout: () => void): Option[] => {
  return [
    {
      key: 'profile',
      label: 'Mon profil',
      onClick: () => console.log('profile'),
      Icon: UserIcon
    },
    {
      key: 'contact',
      label: 'Contact',
      onClick: () => console.log('contact'),
      Icon: MailIcon
    },
    {
      key: 'params',
      label: 'Paramètres',
      onClick: () => console.log('params'),
      Icon: SettingsIcon
    },
    {
      key: 'logout',
      label: i18n('authentication.user-menu.options.logout'),
      Icon: LogOutIcon,
      onClick: logout
    }
  ]
}

const handleItemClick = (action: Option) => {
  if (typeof action.onClick === 'function') {
    action.onClick(action)
  }
}

export const AuthenticatedUserMenuActions: React.FC = () => {
  const { logout } = useAuth()
  const { i18n } = useI18n()

  const authenticatedUserMenuActions = getAuthenticatedUserMenuActions(i18n, logout)

  return (
    <Menu
      className='authenticated-user-menu-actions'
      aria-label={i18n('authentication.user-menu.menu-aria-label')}
    >
      {authenticatedUserMenuActions.map(action => (
        <MenuItem
          key={action.key}
          onAction={() => handleItemClick(action)}
          className='authenticated-user-menu-actions__item'
        >
          <OptionItem
            Icon={action.Icon}
            label={action.label}
            isDisabled={action.isDisabled}
            isSelected={action.isSelected}
          />
        </MenuItem>
      ))}
    </Menu>
  )
}
