import styles from './sidebar.styles.module.sass'

export const Sidebar: React.FC = () => (
  <aside className={styles['sidebar']}>
    <nav>
      Side panel avec nav en vue desktop
    </nav>
  </aside>
)
