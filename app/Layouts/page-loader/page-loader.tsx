import { useLocale } from '@root/app/Hooks'

import styles from './page-loader.styles.module.sass'

const PageLoader: React.FC = () => {
  const { dictionary } = useLocale()

  return (
    <div
      className={styles['container']}
      role='alert'
      aria-live='assertive'
      aria-busy='true'
    >
      <div className={styles['loader']}>
        <span className={styles['loader__wave']} />
        <span className={styles['loader__wave']} />

        <p className={styles['loader__text']}>
          {dictionary.states.loading}
        </p>
      </div>
    </div>
  )
}

export default PageLoader
