import type { Dictionary } from '@/Types'

import styles from './header.styles.module.sass'

type HeaderProps = {
  strings: Dictionary
}

export const Header: React.FC<HeaderProps> = async ({ strings }) => (
  <header className={styles['header']}>
    <h1>{strings.app.title}</h1>
  </header>
)
