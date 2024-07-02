'use client'

import React from 'react'

import { useAuthentication } from '@/authentication/client'

import { AuthenticatedUserMenu } from '@/authentication/components/authenticated-user-menu'
import { VisitorMenu } from '@/authentication/components/visitor-menu'
import { Motion } from '@/components/motion'

export const HeaderMenu: React.FC = () => {
  const { authentication } = useAuthentication()

  if (authentication.status === 'loading') {
    return null
  }

  return (
    <Motion animation='fade-in'>
      {authentication.status === 'authenticated'
        ? <AuthenticatedUserMenu authenticatedUser={authentication.authenticatedUser} />
        : <VisitorMenu />
      }
    </Motion>
  )
}
