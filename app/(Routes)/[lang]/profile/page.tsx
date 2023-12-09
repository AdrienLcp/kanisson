import type { PageProps } from '@/Types'

import { ProfileHeading } from '@root/app/(Routes)/[lang]/profile/components/profile-heading/profile-heading'
import { ProfileForm } from '@/(Routes)/[lang]/profile/components/profile-form/profile-form'
import { getUserProfile } from '@/Actions'
import { getDictionary } from '@/Locales'

import styles from './profile.styles.module.sass'

const ProfilePage: React.FC<PageProps> = async ({ params }) => {
  const dictionary = await getDictionary(params.lang)
  const strings = dictionary.pages.profile

  const result = await getUserProfile({ dictionary })

  return (
    <div className={styles['profile__wrapper']}>
      <div className={styles['profile__container']}>
        <header>
          <h1 className={styles['profile__title']}>
            {strings.title}
          </h1>
        </header>

        <p className={styles['profile__description']}>
          {strings.description}
        </p>

        <div className={styles['profile__content']}>
          {result.status === 'success'
            ? <>
                <ProfileHeading user={result.data} dictionary={dictionary} />
                <ProfileForm user={result.data} dictionary={dictionary} />
              </>
            : <p className={styles['profile__content__error-message']}>
                {result.error}
              </p>
          }
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
