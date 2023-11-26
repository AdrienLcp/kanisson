import type { DefaultUser } from 'next-auth'
import Image from 'next/image'
import { User } from 'lucide-react'

import type { Dictionary, FCWithStrings } from '@/Types'

import styles from './avatar.styles.module.sass'

type AvatarProps = {
  user: DefaultUser
  strings: Dictionary
}

const imgSize = 50

const Avatar: FCWithStrings<AvatarProps> = ({ user, strings }) => {
  const renderAvatar = (user: DefaultUser) => {
    if (user.image) {
      return (
        <Image
          src={user.image}
          alt={strings.components.avatar.alt}
          width={imgSize}
          height={imgSize}
        />
      )
    } else if (user.name) {
      return (
        <span className={styles['avatar__initiale-letter']}>
          {user.name[0]}
        </span>
      )
    } else {
      return <User />
    }
  }

  return (
    <div className={styles['avatar']}>
      {renderAvatar(user)}
    </div>    
  )
}

export default Avatar
