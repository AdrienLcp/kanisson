import { Home, ListMusic, PlusCircle, Search } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

import type { NavLink } from '@/Types'
import { getPathnameWithoutLocale } from '@/Helpers'
import { useAuth, useLocale } from '@/Hooks'
import { ROUTES } from '@/Config'
import { cn } from '@/Lib'

import styles from './navbar.styles.module.sass'

const Navbar: React.FC = () => {
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
    <nav className={styles['navbar']}>
      <ul className={styles['navbar__list']}>
        {navLinks.map(({ id, label, path, Icon, isVisible }) => isVisible && (
          <li key={id}>
            <Link
              href={path}
              aria-label={label}
              className={cn(
                styles['navbar__list__link'],
                currentPath === path && styles['active']
              )}
            >
              <Icon />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar
