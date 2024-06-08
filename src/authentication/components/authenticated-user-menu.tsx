import React from 'react'

import type { AuthenticatedUser } from '@/authentication'

import { Dialog } from '@/components/dialog'
import { Pressable } from '@/components/pressable'
import type { I18n } from '@/i18n'
import { Avatar } from '@/user/components/avatar'

import './authenticated-user-menu.styles.sass'

type AuthUserMenuProps = {
  authenticatedUser: AuthenticatedUser
  i18n: I18n
}

type AuthUserMenuTriggerProps = Pick<AuthUserMenuProps, 'authenticatedUser'>

const AuthenticatedUserMenuTrigger: React.FC<AuthUserMenuTriggerProps> = ({ authenticatedUser }) => (
  <Pressable className='auth-user-menu__trigger-button'>
    <Avatar user={authenticatedUser} />
  </Pressable>
)

export const AuthenticatedUserMenu: React.FC<AuthUserMenuProps> = ({ authenticatedUser, i18n }) => {
  const DialogTrigger = <AuthenticatedUserMenuTrigger authenticatedUser={authenticatedUser} />

  return (
    <Dialog
      className='auth-user-menu'
      placement='bottom right'
      Trigger={DialogTrigger}
    >
      {i18n('components.avatar.common-alt')}
    </Dialog>
  )
}
