import type { PageProps } from '@/Types'

import { getDictionary } from '@/Locales'

import styles from './dashboard.styles.module.sass'

const DashboardPage: React.FC<PageProps> = async ({ params }) => {
  const dictionary = await getDictionary(params.lang)
  const strings = dictionary.pages.dashboard

  return (
    <div className={styles['dashboard__wrapper']}>
      <div className={styles['dashboard__container']}>
        <h1 className={styles['dashboard__title']}>
          {strings.title}
        </h1>

        <p className={styles['dashboard__description']}>
          
        </p>

        <div>
          
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
