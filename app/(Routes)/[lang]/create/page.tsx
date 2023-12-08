import type { PageProps } from '@/Types'

import { getDictionary } from '@/Locales'

import styles from './create.styles.module.sass'

const Create: React.FC<PageProps> = async ({ params }) => {
  const dictionary = await getDictionary(params.lang)
  const strings = dictionary.pages.create

  return (
    <div className={styles['create__wrapper']}>
      <div className={styles['create__container']}>
        <h1 className={styles['create__title']}>
          {strings.title}
        </h1>

        <p className={styles['create__description']}>

        </p>

        <div>

        </div>
      </div>
    </div>
  )
}

export default Create
