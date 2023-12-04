import { Disc3, Home, ListMusic, PlusCircle, Search, Youtube } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

import type { NavLink } from '@/Types'
import { getPathnameWithoutLocale } from '@/Helpers'
import { useAuth, useLocale } from '@/Hooks'
import { Tooltip } from '@/Components'
import { ROUTES } from '@/Config'
import { cn } from '@/Lib'

import styles from './sidebar.styles.module.sass'

const Sidebar: React.FC = () => {
  const { dictionary } = useLocale()
  const { user } = useAuth()
  const pathname = usePathname()
  const currentPath = getPathnameWithoutLocale(pathname)

  const navLinks: NavLink[] = [
    {
      id: ROUTES.home.id,
      path: ROUTES.home.path,
      label: dictionary.pages.home.label,
      Icon: Home,
      isVisible: true
    },
    {
      id: ROUTES.search.id,
      path: ROUTES.search.path,
      label: dictionary.pages.search.label,
      Icon: Search,
      isVisible: true
    },
    {
      id: ROUTES.create.id,
      path: ROUTES.create.path,
      label: dictionary.pages.create.label,
      Icon: PlusCircle,
      isVisible: !!user && user.status !== 'banned'
    },
    {
      id: ROUTES.playlists.id,
      path: ROUTES.playlists.path,
      label: dictionary.pages.playlists.label,
      Icon: ListMusic,
      isVisible: true
    }
  ]

  return (
    <aside className={styles['sidebar']}>
      <header className={styles['heading']}>
        <Tooltip content={dictionary.layouts.nav.logoTooltip}>
          <Link
            href='/'
            className={styles['heading__logo']}
          >
            <Disc3 />
          </Link>
        </Tooltip>
      </header>

      <nav className={styles['nav']}>
        <ul>
          {navLinks.map(({ id, label, path, Icon, isVisible }) => isVisible && (
            <li key={id}>
              <Link
                href={path}
                className={cn(
                  styles['nav__link'],
                  currentPath === path && styles['active']
                )}
              >
                <div className={styles['overlay']}>
                  {label}
                </div>
                
                <div className={styles['icon']}>
                  <Icon size='1.2em' />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <footer className={styles['footer']}>
        <div className={styles['overlay']}>
          {dictionary.layouts.footer.youtube}
        </div>

        <div className={styles['icon']}>
          <Youtube size='1.5em' />
        </div>
      </footer>
    </aside>
  )
}

export default Sidebar
