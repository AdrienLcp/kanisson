import type { PageProps } from '@/Types'

import { getUserProfile } from '@/Actions'
import { getDictionary } from '@/Locales'
import { Avatar } from '@/Components'

import styles from './profile.styles.module.sass'

const Profile: React.FC<PageProps> = async ({ params }) => {
  const dictionary = await getDictionary(params.lang)
  const strings = dictionary.pages.profile

  const result = await getUserProfile({ dictionary })

  return (
    <div className={styles['profile__wrapper']}>
      <div className={styles['profile__container']}>
        <h2 className={styles['profile__title']}>
          {strings.title}
        </h2>

        <p className={styles['profile__description']}>
          {strings.description}
        </p>

        <div className={styles['profile__content']}>
          {result.status === 'success'
            ? <Avatar user={result.data} />
            : <p className={styles['profile__content__error-message']}>
                {result.error}
              </p>
          }
        </div>
      </div>
    </div>
  )
}

export default Profile
