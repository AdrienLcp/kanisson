import type { PageProps } from '@/Types'

import { getDictionary } from '@/Locales'

import styles from './playlists.styles.module.sass'

const Playlists: React.FC<PageProps> = async ({ params }) => {
  const dictionary = await getDictionary(params.lang)
  const strings = dictionary.pages.playlists

  return (
    <div className={styles['playlists__wrapper']}>
      <div className={styles['playlists__container']}>
        <h1 className={styles['playlists__title']}>
          {strings.title}
        </h1>

        <p className={styles['playlists__description']}>

        </p>

        <div>
          
        </div>
      </div>
    </div>
  )
}

export default Playlists
