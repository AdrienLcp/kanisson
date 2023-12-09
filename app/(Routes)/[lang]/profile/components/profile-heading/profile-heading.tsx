import Link from 'next/link'
import { User } from 'lucide-react'

import type { Dictionary, PrivateUser } from '@/Types'
import { Button, Tooltip } from '@/Components'

import styles from './profile-heading.styles.module.sass'

type ProfileHeadingProps = {
  user: PrivateUser
  dictionary: Dictionary
}

export const ProfileHeading: React.FC<ProfileHeadingProps> = ({ user, dictionary }) => {
  const strings = dictionary.pages.profile

  return (
    <div className={styles['profile-heading']}>
      <div>
        <div className={styles['profile-heading__content']}>
          <h2 className={styles['profile-heading__content__label']}>
            {strings.heading.accountName} :
          </h2>
          <span>{user.name}</span>
        </div>

        {user.pseudo && (
          <div className={styles['profile-heading__content']}>
            <h2 className={styles['profile-heading__content__label']}>
              {strings.heading.username} :
            </h2>
            <span>{user.pseudo}</span>
          </div>
        )}
      </div>

      <Tooltip content={strings.heading.linkTooltip}>
        <Button
          size='icon'
          variant='outline'
          asChild
        >
          <Link
            href={`/user/${user.publicId}`}
            aria-label={strings.heading.linkTooltip}
          >
            <User />
          </Link>
        </Button>
      </Tooltip>
    </div>
  )
}
