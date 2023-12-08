'use client'

import { User } from 'lucide-react'

import { Avatar as ShadcnAvatar , AvatarFallback, AvatarImage } from '@/Components/base/ui/avatar'

import type { User as TUser } from '@/Types'
import { useLocale } from '@/Hooks'

type AvatarProps = {
  user: TUser
}

const Avatar: React.FC<AvatarProps> = ({ user }) => {
  const { dictionary } = useLocale()
  const strings = dictionary.components.avatar

  const renderAvatar = () => {
    if (user.image) {
      return (
        <>
          <AvatarImage
            src={user.image}
            alt={strings.alt}
          />
          <AvatarFallback>
            {user.name ? user.name[0] : <User />}
          </AvatarFallback>
        </>
      )
    }

    if (user.name) {
      return (
        <AvatarFallback>
          {user.name[0]}
        </AvatarFallback>
      )
    }

    return (
      <AvatarFallback>
        <User />
      </AvatarFallback>
    )
  }

  return (
    <ShadcnAvatar>
      {renderAvatar()}
    </ShadcnAvatar>
  )
}

export default Avatar
