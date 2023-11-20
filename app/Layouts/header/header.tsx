import styles from './header.styles.module.sass'

type HeaderProps = {
  title: string
}

export const Header: React.FC<HeaderProps> = ({ title }) => (
  <header className={styles['header']}>
    <h1>{title}</h1>
  </header>
)
