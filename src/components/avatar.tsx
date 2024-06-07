'use client'

import { UserIcon } from 'lucide-react'
import React from 'react'

import type { AuthUser } from '@/auth'
import { Image } from '@/components/image'
import { useI18n } from '@/i18n/client'

import './avatar.styles.sass'

type AvatarSize = 'small' | 'medium' | 'large'

type AvatarProps = {
  user: AuthUser | null
  size?: AvatarSize
}

const AVATAR_PSEUDO_MAX_LENGTH = 3

const avatarSizes: Record<AvatarSize, string> = {
  small: 'var(--size-80, 1.13rem)',
  medium: 'var(--size-100, 1.62rem)',
  large: 'var(--size-120, 2.33rem)'
}

export const Avatar: React.FC<AvatarProps> = ({ size = 'small', user }) => {
  const { i18n } = useI18n()
  const className = 'avatar__image'

  const renderAvatarContent = () => {
    if (user === null) {
      return <UserIcon />
    }

    if (user.avatar !== null) {
      return (
        <Image
          alt={user.pseudo === null
            ? i18n('components.avatar.common-alt')
            : i18n('components.avatar.user-alt', { pseudo: user.pseudo })
          }
          className={className}
          src={user.avatar}
        />
      )
    }

    if (user.pseudo !== null) {
      const letters = user.pseudo
        .trim()
        .split(' ')
        .filter((_, index) => index < AVATAR_PSEUDO_MAX_LENGTH)
        .map(word => word.slice(0, 1))
        .join('')
        .toUpperCase()

      return (
        <span className='avatar__text'>
          {letters}
        </span>
      )
    }

    return <UserIcon />
  }

  return (
    <span className='avatar'>
      {renderAvatarContent()}
    </span>
  )
}
