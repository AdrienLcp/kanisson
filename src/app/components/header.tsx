import React from 'react'

import { HeaderTitle } from '@/app/components/header-title'
import type { AuthenticatedUser } from '@/authentication'
import { AuthenticatedUserMenu } from '@/authentication/components/authenticated-user-menu'
import { VisitorMenu } from '@/authentication/components/visitor-menu'
import { Motion } from '@/components/motion'

import './header.styles.sass'

type HeaderProps = {
  authenticatedUser: AuthenticatedUser | null
}

export const Header: React.FC<HeaderProps> = ({ authenticatedUser }) => (
  <header>
    <Motion animation='fade-in-slow' className='header'>
      <HeaderTitle />

      {authenticatedUser === null
        ? <VisitorMenu />
        : <AuthenticatedUserMenu authenticatedUser={authenticatedUser} />
      }
    </Motion>
  </header>
)
