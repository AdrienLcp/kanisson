import React from 'react'

import type { AuthenticatedUser } from '@/authentication'
import { AuthenticatedUserMenuActions } from '@/authentication/components/authenticated-user-menu-actions'
import { Dialog } from '@/components/dialog'
import { Pressable } from '@/components/pressable'
import { isValidString } from '@/helpers/strings'
import type { I18n } from '@/i18n'
import { Avatar } from '@/user/components/avatar'

import './authenticated-user-menu.styles.sass'

type AuthenticatedUserMenuProps = {
  authenticatedUser: AuthenticatedUser
  i18n: I18n
}

type AuthenticatedUserMenuTriggerProps = Pick<AuthenticatedUserMenuProps, 'authenticatedUser'>

const AuthenticatedUserMenuTrigger: React.FC<AuthenticatedUserMenuTriggerProps> = ({ authenticatedUser }) => (
  <Pressable className='authenticated-user-menu__trigger-button' aria-label='test'>
    <Avatar user={authenticatedUser} />
  </Pressable>
)

const getAuthenticatedUsername = (authenticatedUser: AuthenticatedUser) => {
  if (isValidString(authenticatedUser.pseudo)) {
    return authenticatedUser.pseudo
  }

  if (isValidString(authenticatedUser.name)) {
    return authenticatedUser.name
  }

  return null
}

export const AuthenticatedUserMenu: React.FC<AuthenticatedUserMenuProps> = ({ authenticatedUser, i18n }) => {
  const AuthenticatedUserMenuDialogTrigger = <AuthenticatedUserMenuTrigger authenticatedUser={authenticatedUser} />
  const username = getAuthenticatedUsername(authenticatedUser)

  return (
    <Dialog
      className='authenticated-user-menu'
      placement='bottom right'
      Trigger={AuthenticatedUserMenuDialogTrigger}
    >
      {username !== null && (
        <div className='authenticated-user-menu__heading'>
          <span className='authenticated-user-menu__heading__label'>
            {i18n('authentication.user-menu.user')}
          </span>

          <span className='authenticated-user-menu__heading__username'>
            {username}
          </span>
        </div>
      )}

      <AuthenticatedUserMenuActions />
    </Dialog>
  )
}
