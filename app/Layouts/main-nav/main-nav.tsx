import { Navbar, Sidebar } from '@/Layouts'

import styles from './main-nav.styles.module.sass'

export const MainNav: React.FC = () => (
  <>
    {/* Mobile navbar (only visible when viewport width < 992px)*/}
    <div className={styles['navbar']}>
      <Navbar />
    </div>

    {/* Desktop sidebar (only visible when viewport width > 991px)*/}
    <div className={styles['sidebar']}>
      <Sidebar />
    </div>
  </>
)