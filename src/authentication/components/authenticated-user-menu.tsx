import React from 'react'

import type { AuthenticatedUser } from '@/authentication'
import { Dialog } from '@/components/dialog'
import { Pressable } from '@/components/pressable'
import { isValidString } from '@/helpers/strings'
import type { I18n } from '@/i18n'
import { Avatar } from '@/user/components/avatar'

import './authenticated-user-menu.styles.sass'

type AuthUserMenuProps = {
  authenticatedUser: AuthenticatedUser
  i18n: I18n
}

type AuthUserMenuTriggerProps = Pick<AuthUserMenuProps, 'authenticatedUser'>

const AuthenticatedUserMenuTrigger: React.FC<AuthUserMenuTriggerProps> = ({ authenticatedUser }) => (
  <Pressable className='authenticated-user-menu__trigger-button'>
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

export const AuthenticatedUserMenu: React.FC<AuthUserMenuProps> = ({ authenticatedUser, i18n }) => {
  const DialogTrigger = <AuthenticatedUserMenuTrigger authenticatedUser={authenticatedUser} />
  const username = getAuthenticatedUsername(authenticatedUser)

  return (
    <Dialog
      className='authenticated-user-menu'
      placement='bottom right'
      Trigger={DialogTrigger}
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

      <ul className='authenticated-user-menu__options-list'>

      </ul>
    </Dialog>
  )
}
