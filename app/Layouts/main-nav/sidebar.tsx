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
  const { strings } = useLocale()
  const { user } = useAuth()
  const pathname = usePathname()
  const currentPath = getPathnameWithoutLocale(pathname)

  const navLinks: NavLink[] = [
    {
      id: ROUTES.home.id,
      path: ROUTES.home.path,
      label: strings.pages.home.label,
      Icon: Home,
      isVisible: true
    },
    {
      id: ROUTES.search.id,
      path: ROUTES.search.path,
      label: strings.pages.search.label,
      Icon: Search,
      isVisible: true
    },
    {
      id: ROUTES.create.id,
      path: ROUTES.create.path,
      label: strings.pages.create.label,
      Icon: PlusCircle,
      isVisible: !!user && user.status !== 'banned'
    },
    {
      id: ROUTES.playlists.id,
      path: ROUTES.playlists.path,
      label: strings.pages.playlists.label,
      Icon: ListMusic,
      isVisible: true
    }
  ]

  return (
    <aside className={styles['sidebar']}>
      <header className={styles['heading']}>
        <Tooltip content={strings.layouts.nav.logo_tooltip}>
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
                <Icon size='1.2em' className={styles['icon']} />

                <div className={styles['overlay']}>
                  <Icon size='1.2em' />
                  <span>{label}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <footer className={styles['footer']}>
        <Youtube size='1.5em' className={styles['icon']} />

        <div className={styles['overlay']}>
          <Youtube size='1.5em' color='#fe0000' />
          <span>{strings.layouts.footer.youtube}</span>
        </div>
      </footer>
    </aside>
  )
}

export default Sidebar
