import React from 'react'

import type { AuthenticatedUser } from '@/authentication'
import { AuthenticatedUserMenu } from '@/authentication/components/authenticated-user-menu'
import { VisitorMenu } from '@/authentication/components/visitor-menu'
import { Motion } from '@/components/motion'
import type { I18n } from '@/i18n'

import './header.styles.sass'

type HeaderProps = {
  authenticatedUser: AuthenticatedUser | null
  i18n: I18n
}

export const Header: React.FC<HeaderProps> = ({ authenticatedUser, i18n }) => (
  <header>
    <Motion animation='fade-in-slow' className='header'>
      <h1 className='header__title'>
        {i18n('metadata.short-name')}
      </h1>

      {authenticatedUser === null
        ? <VisitorMenu />
        : <AuthenticatedUserMenu authenticatedUser={authenticatedUser} i18n={i18n} />
      }
    </Motion>
  </header>
)
