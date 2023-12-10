import type { PageProps } from '@/Types'
import { Accordion, EditPlaylist } from '@/Components'
import { getDictionary } from '@/Locales'
import { PageWrapper } from '@/Layouts'

import styles from './create.styles.module.sass'

const CreatePage: React.FC<PageProps> = async ({ params }) => {
  const dictionary = await getDictionary(params.lang)
  const strings = dictionary.pages.create

  return (
    <PageWrapper
      title={strings.title}
      description={strings.description}
    >
      <Accordion title={strings.accordionTitle}>
        <div className={styles['steps']}>
          <div>
            <h2>1. {strings.steps.one.title}</h2>
            <p className={styles['steps__description']}>
              {strings.steps.one.description}
            </p>
          </div>
          <div>
            <h2>2. {strings.steps.two.title}</h2>
            <p className={styles['steps__description']}>
              {strings.steps.two.description}
            </p>
          </div>
          <div>
            <h2>3. {strings.steps.three.title}</h2>
            <p className={styles['steps__description']}>
              {strings.steps.three.description}
            </p>
          </div>
        </div>
      </Accordion>

      <EditPlaylist />
    </PageWrapper>
  )
}

export default CreatePage
