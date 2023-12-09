import type { PageProps } from '@/Types'

import { ProfileHeading } from '@/(Routes)/[lang]/profile/components/profile-heading/profile-heading'
import { ProfileForm } from '@/(Routes)/[lang]/profile/components/profile-form/profile-form'
import { getUserProfile } from '@/Actions'
import { getDictionary } from '@/Locales'
import { PageWrapper } from '@/Layouts'

import styles from './profile.styles.module.sass'

const ProfilePage: React.FC<PageProps> = async ({ params }) => {
  const dictionary = await getDictionary(params.lang)
  const strings = dictionary.pages.profile

  const result = await getUserProfile({ dictionary })

  return (
    <PageWrapper
      title={strings.title}
      description={strings.description}
    >
      {result.status === 'success'
        ? <>
            <ProfileHeading user={result.data} dictionary={dictionary} />
            <ProfileForm user={result.data} dictionary={dictionary} />
          </>
        : <p className={styles['profile__error-message']}>
            {result.error}
          </p>
      }
    </PageWrapper>
  )
}

export default ProfilePage
