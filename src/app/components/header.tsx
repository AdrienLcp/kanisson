import React from 'react'

import type { AuthenticatedUser } from '@/authentication'
import { AuthenticatedUserMenu } from '@/authentication/components/authenticated-user-menu'
import { LoginButton } from '@/authentication/components/login-button'
import { Motion } from '@/components/motion'
import type { I18n } from '@/i18n'

import './header.styles.sass'

type HeaderProps = {
  authenticatedUser: AuthenticatedUser | null
  i18n: I18n
}

export const Header: React.FC<HeaderProps> = ({ authenticatedUser, i18n }) => (
  <header className='header'>
    <Motion animation='fade-in-slow'>
      {authenticatedUser === null
        ? <LoginButton />
        : <AuthenticatedUserMenu authenticatedUser={authenticatedUser} i18n={i18n} />
      }
    </Motion>
  </header>
)
