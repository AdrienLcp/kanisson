import { useLocale } from '@/Hooks'

import styles from './footer.styles.module.sass'

const Footer: React.FC = () => {
  const { dictionary } = useLocale()
  const strings = dictionary.layouts.footer

  return (
    <footer className={styles['footer']}>
      <div className={styles['footer__content']}>
        <p>{strings.copyright}</p>
      </div>
    </footer>
  )
}

export default Footer
