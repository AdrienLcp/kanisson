import type { PageProps } from '@/Types'

import { getDictionary } from '@/Locales'

import styles from './search.styles.module.sass'

const SearchPage: React.FC<PageProps> = async ({ params }) => {
  const dictionary = await getDictionary(params.lang)
  const strings = dictionary.pages.search

  return (
    <div className={styles['search__wrapper']}>
      <div className={styles['search__container']}>
        <h1 className={styles['search__title']}>
          {strings.title}
        </h1>

        <p className={styles['search__description']}>

        </p>

        <div>
          
        </div>
      </div>
    </div>
  )
}

export default SearchPage
