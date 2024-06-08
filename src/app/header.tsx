import React from 'react'

import type { AuthUser } from '@/auth'
import { Avatar } from '@/components/avatar'

type HeaderProps = {
  authUser: AuthUser | null
}

export const Header: React.FC<HeaderProps> = ({ authUser }) => (
  <header>
    <Avatar user={authUser} size='medium' />
  </header>
)
