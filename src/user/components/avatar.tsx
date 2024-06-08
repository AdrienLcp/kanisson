'use client'

import type { User } from '@prisma/client'
import { UserIcon } from 'lucide-react'
import React from 'react'

import { Image } from '@/components/image'
import type { ComponentSizes } from '@/config/ui'
import { isValidString } from '@/helpers/strings'
import { type ResponsiveSize, classNames } from '@/helpers/styles'
import type { I18n } from '@/i18n'
import { useI18n } from '@/i18n/client'

import './avatar.styles.sass'

type AvatarSize = ComponentSizes
type AvatarUser = Pick<User, 'avatar' | 'pseudo'>

type AvatarProps = {
  /**
   * User with optional pseudo and optional avatar to display.
   * @type { avatar: string | null, pseudo: string | null }
   */
  user: AvatarUser

  /**
   * Size of the avatar.
   * @values 'small', 'medium', 'large'
   * @default 'medium'
   */
  size?: AvatarSize
}

type AvatarFallbackProps = {
  size: AvatarSize
}

const avatarFallbackIconSizes: Record<AvatarSize, ResponsiveSize> = {
  small: '0.5rem',
  medium: '1rem',
  large: '1.8rem'
}

const AvatarFallback: React.FC<AvatarFallbackProps> = ({ size }) => (
  <UserIcon size={avatarFallbackIconSizes[size]} />
)

const getAvatarContent = (user: AvatarUser, size: AvatarSize, i18n: I18n, onImageError: () => void) => {
  if (user === null) {
    return <AvatarFallback size={size} />
  }

  if (user.avatar !== null) {
    return (
      <Image
        alt={user.pseudo === null
          ? i18n('components.avatar.common-alt')
          : i18n('components.avatar.user-alt', { pseudo: user.pseudo })
        }
        onError={onImageError}
        src={user.avatar}
      />
    )
  }

  if (isValidString(user.pseudo)) {
    return user.pseudo
      .trim()
      .charAt(0)
      .toUpperCase()
  }

  return <AvatarFallback size={size} />
}

/**
 * Avatar component that displays a user icon fallback if user pseudo or avatar is not provided.
 */
export const Avatar: React.FC<AvatarProps> = ({ size = 'medium', user }) => {
  const [hasImageError, setHasImageError] = React.useState<boolean>(false)

  const { i18n } = useI18n()

  return (
    <div className={classNames('avatar', size)}>
      {hasImageError
        ? <AvatarFallback size={size} />
        : getAvatarContent(user, size, i18n, () => setHasImageError(true))
      }
    </div>
  )
}
