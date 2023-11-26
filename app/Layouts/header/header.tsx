import type { FCWithStrings } from '@/Types'

import { PersonaMenu } from '@/Components'

import styles from './header.styles.module.sass'

const Header: FCWithStrings = ({ strings }) => (
  <header className={styles['header']}>
    <h1>{strings.app.title}</h1>

    <PersonaMenu strings={strings} />
  </header>
)

export default Header
