import type { PageProps } from '@/Types'
import { HueSwitcher, LocaleSwitcher, ThemeSwitcher, VolumeSlider } from '@/Components'
import { getDictionary } from '@/I18n'

import styles from './settings.styles.module.sass'

const Settings: React.FC<PageProps> = async ({ params }) => {
  const dictionary = await getDictionary(params.lang)
  const strings = dictionary.pages.settings

  return (
    <div className={styles['settings-wrapper']}>
      <div className={styles['settings-container']}>
        <h2 className={styles['settings__title']}>
          {strings.title}
        </h2>

        <p className={styles['settings__description']}>
          {strings.description}
        </p>

        <div className={styles['content']}>
          <section>
            <h3 className={styles['content__title']}>
              {strings.sections.volume}
            </h3>
            
            <VolumeSlider />
          </section>

          <section>
            <h3 className={styles['content__title']}>
              {strings.sections.locale}
            </h3>

            <LocaleSwitcher />
          </section>

          <section>
            <h3 className={styles['content__title']}>
              {strings.sections.theme}
            </h3>
            
            <ThemeSwitcher />
          </section>

          <section>
            <h3 className={styles['content__title']}>
              {strings.sections.hue}
            </h3>

            <HueSwitcher />
          </section>
        </div>
      </div>
    </div>
  )
}

export default Settings
