'use client'

import { LogOutIcon, MailIcon, SettingsIcon, UserIcon } from 'lucide-react'
import React from 'react'
import { type Key, ListBox } from 'react-aria-components'

import { useAuthentication } from '@/authentication/client'
import { ListBoxItem } from '@/components/list-box-item'
import { type Option, OptionItem } from '@/components/option-item'
import type { I18n } from '@/i18n'
import { useI18n } from '@/i18n/client'
import { ROUTES } from '@/routes'
import { useNavigation, type Navigate } from '@/routes/navigation'

const getAuthenticatedUserMenuActions = (i18n: I18n, logout: () => void, navigate: Navigate) => {
  const authenticatedUserMenuActions: Array<Option<string>> = [
    {
      Icon: UserIcon,
      key: 'user',
      label: i18n('routes.user.link-label'),
      onClick: () => navigate(ROUTES.user)
    },
    {
      Icon: MailIcon,
      key: 'contact',
      label: i18n('routes.contact.link-label'),
      onClick: () => navigate(ROUTES.contact)
    },
    {
      Icon: SettingsIcon,
      key: 'settings',
      label: i18n('routes.settings.link-label'),
      onClick: () => navigate(ROUTES.settings)
    },
    {
      Icon: LogOutIcon,
      key: 'logout',
      label: i18n('authentication.user-menu.options.logout'),
      onClick: logout
    }
  ]

  return authenticatedUserMenuActions
}

const handleActionClick = (key: Key, items: Array<Option<string>>) => {
  const clickedAction = items.find(option => option.key === key)

  if (clickedAction === undefined) {
    return
  }

  if (typeof clickedAction.onClick === 'function') {
    clickedAction.onClick(clickedAction)
  }
}

export const AuthenticatedUserMenuActions: React.FC = () => {
  const { logout } = useAuthentication()
  const { i18n } = useI18n()
  const navigate = useNavigation()

  const authenticatedUserMenuActions = getAuthenticatedUserMenuActions(i18n, logout, navigate)

  return (
    <ListBox
      aria-label={i18n('authentication.user-menu.menu-aria-label')}
      items={authenticatedUserMenuActions}
      onAction={(key) => handleActionClick(key, authenticatedUserMenuActions)}
    >
      {action => (
        <ListBoxItem
          id={action.key}
          key={action.key}
          textValue={action.label}
        >
          <OptionItem
            className={action.className}
            Icon={action.Icon}
            isPrefixedByDivider={action.isPrefixedByDivider}
            isDisabled={action.isDisabled}
            isSelected={action.isSelected}
            key={action.key}
            label={action.label}
          />
        </ListBoxItem>
      )}
    </ListBox>
  )
}
