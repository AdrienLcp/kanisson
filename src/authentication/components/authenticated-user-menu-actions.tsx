'use client'

import { LogOutIcon, MailIcon, SettingsIcon, UserIcon } from 'lucide-react'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { useRouter } from 'next/navigation'
import React from 'react'

import { useAuthentication } from '@/authentication/client'
import { type Option, OptionItem } from '@/components/option-item'
import { Pressable } from '@/components/pressable'
import type { I18n } from '@/i18n'
import { useI18n } from '@/i18n/client'
import { ROUTES } from '@/routes'

import './authenticated-user-menu-actions.styles.sass'

const getAuthenticatedUserMenuActions = (i18n: I18n, logout: () => void, router: AppRouterInstance) => {
  const authenticatedUserMenuActions: Array<Option<string>> = [
    {
      Icon: UserIcon,
      id: 'profile',
      label: i18n('routes.profile.link-label'),
      onClick: () => router.push(ROUTES.profile)
    },
    {
      Icon: MailIcon,
      id: 'contact',
      label: i18n('routes.contact.link-label'),
      onClick: () => router.push(ROUTES.contact)
    },
    {
      Icon: SettingsIcon,
      id: 'settings',
      label: i18n('routes.settings.link-label'),
      onClick: () => router.push(ROUTES.settings)
    },
    {
      Icon: LogOutIcon,
      id: 'logout',
      label: i18n('authentication.user-menu.options.logout'),
      onClick: logout
    }
  ]

  return authenticatedUserMenuActions
}

const handleActionClick = (action: Option<string>) => {
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
    <ul className='authenticated-user-menu-actions'>
      {authenticatedUserMenuActions.map(action => (
        <li
          className='authenticated-user-menu-actions__item'
          key={action.id}
        >
          <Pressable
            className='authenticated-user-menu-actions__item__button'
            onPress={() => handleActionClick(action)}
          >
            <OptionItem {...action} />
          </Pressable>
        </li>
      ))}
    </ul>
  )
}
