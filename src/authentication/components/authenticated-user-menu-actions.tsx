'use client'

import { LogOutIcon, MailIcon, SettingsIcon, UserIcon } from 'lucide-react'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import React from 'react'
import { Menu, MenuItem } from 'react-aria-components'

import { useAuthentication } from '@/authentication/client'
import { type Option, OptionItem } from '@/components/option-item'
import type { I18n } from '@/i18n'
import { useI18n } from '@/i18n/client'

import './authenticated-user-menu-actions.styles.sass'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/routes'

const getAuthenticatedUserMenuActions = (i18n: I18n, logout: () => void, router: AppRouterInstance): Option[] => {
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
      onClick: () => router.push(ROUTES.settings),
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
  const { logout } = useAuthentication()
  const { i18n } = useI18n()

  const router = useRouter()

  const authenticatedUserMenuActions = getAuthenticatedUserMenuActions(i18n, logout, router)

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
            isDisabled={action.isDisabled}
            isSelected={action.isSelected}
            key={action.key}
            label={action.label}
          />
        </MenuItem>
      ))}
    </Menu>
  )
}
