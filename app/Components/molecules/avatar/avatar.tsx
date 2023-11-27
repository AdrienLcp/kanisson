import type { DefaultUser } from 'next-auth'
import { User } from 'lucide-react'

import type { FCWithStrings } from '@/Types'
import { Avatar as ShadcnAvatar , AvatarFallback, AvatarImage } from '@/Components/base/ui/avatar'

type AvatarProps = {
  user: DefaultUser
}

const Avatar: FCWithStrings<AvatarProps> = ({ user, strings }) => (
  <ShadcnAvatar>
    {user.image && (
      <AvatarImage
        src={user.image}
        alt={strings.components.avatar.alt}
      />
    )}

    {user.name && (
      <AvatarFallback>
        {user.name[0]}
      </AvatarFallback>
    )}

    {!user.image && !user.name && (
      <AvatarFallback>
        <User />
      </AvatarFallback>
    )}
  </ShadcnAvatar>
)

export default Avatar
