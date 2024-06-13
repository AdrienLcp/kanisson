'use client'

import { LogOutIcon, MailIcon, SettingsIcon, UserIcon } from 'lucide-react'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { useRouter } from 'next/navigation'
import React from 'react'

import { useAuthentication } from '@/authentication/client'
import { type Option, OptionItem } from '@/components/option-item'
import type { I18n } from '@/i18n'
import { useI18n } from '@/i18n/client'
import { ROUTES } from '@/routes'

import './authenticated-user-menu-actions.styles.sass'

const getAuthenticatedUserMenuActions = (i18n: I18n, logout: () => void, router: AppRouterInstance) => {
  const authenticatedUserMenuActions: Option[] = [
    {
      id: 'profile',
      label: 'Mon profil',
      onClick: () => console.log('profile'),
      Icon: UserIcon
    },
    {
      id: 'contact',
      label: 'Contact',
      onClick: () => console.log('contact'),
      Icon: MailIcon
    },
    {
      id: 'params',
      label: 'Paramètres',
      onClick: () => router.push(ROUTES.settings),
      Icon: SettingsIcon
    },
    {
      id: 'logout',
      label: i18n('authentication.user-menu.options.logout'),
      Icon: LogOutIcon,
      onClick: logout
    }
  ]

  return authenticatedUserMenuActions
}

export const AuthenticatedUserMenuActions: React.FC = () => {
  const { logout } = useAuthentication()
  const { i18n } = useI18n()

  const router = useRouter()

  const authenticatedUserMenuActions = getAuthenticatedUserMenuActions(i18n, logout, router)

  return (
    <ul className='authenticated-user-menu-actions'>
      {authenticatedUserMenuActions.map((action) => (
        <li
          className='authenticated-user-menu-actions__item'
          key={action.id}
        >
          <OptionItem
            Icon={action.Icon}
            isDisabled={action.isDisabled}
            isSelected={action.isSelected}
            id={action.id}
            onClick={action.onClick}
            label={action.label}
          />
        </li>
      ))}
    </ul>
  )
}
