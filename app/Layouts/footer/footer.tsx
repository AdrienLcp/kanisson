import { useLocale } from '@/Hooks'

import styles from './footer.styles.module.sass'

const Footer: React.FC = () => {
  const { strings } = useLocale()

  return (
    <footer className={styles['footer']}>
      <div className={styles['footer__content']}>
        <p>{strings.layouts.footer.copyright}</p>
      </div>
    </footer>
  )
}

export default Footer
