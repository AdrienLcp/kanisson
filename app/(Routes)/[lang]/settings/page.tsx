import type { PageProps } from '@/Types'
import { HueSwitcher, LocaleSwitcher, ThemeSwitcher, VolumeSlider } from '@/Components'
import { getDictionary } from '@/Locales'
import { PageWrapper } from '@/Layouts'

import styles from './settings.styles.module.sass'

const SettingsPage: React.FC<PageProps> = async ({ params }) => {
  const dictionary = await getDictionary(params.lang)
  const strings = dictionary.pages.settings

  return (
    <PageWrapper
      title={strings.title}
      description={strings.description}
    >
      <section>
        <h2 className={styles['settings__content__title']}>
          {strings.sections.volume}
        </h2>
        
        <VolumeSlider />
      </section>

      <section>
        <h2 className={styles['settings__content__title']}>
          {strings.sections.locale}
        </h2>

        <LocaleSwitcher />
      </section>

      <section>
        <h2 className={styles['settings__content__title']}>
          {strings.sections.theme}
        </h2>
        
        <ThemeSwitcher />
      </section>

      <section>
        <h2 className={styles['settings__content__title']}>
          {strings.sections.hue}
        </h2>

        <HueSwitcher />
      </section>
    </PageWrapper>
  )
}

export default SettingsPage
