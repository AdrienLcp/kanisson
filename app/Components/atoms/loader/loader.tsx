import { useLocale } from '@/Hooks'

import styles from './loader.styles.module.sass'

const Loader: React.FC = () => {
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

export default Loader
