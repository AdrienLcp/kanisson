import { Disc3, Home, PlusCircle, Search, Youtube } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

import type { NavLink } from '@/Layouts/main-nav/nav.types'
import { getPathnameWithoutLocale } from '@/Helpers'
import { useLocale } from '@/Hooks'
import { cn } from '@/Lib'

import styles from './sidebar.styles.module.sass'

const Sidebar: React.FC = () => {
  const { strings } = useLocale()
  const pathname = usePathname()
  const currentPath = getPathnameWithoutLocale(pathname)

  const navLinks: NavLink[] = [
    {
      id: 'home',
      label: strings.pages.home.label,
      path: '/',
      Icon: Home
    },
    {
      id: 'search',
      label: strings.pages.search.label,
      path: '/search',
      Icon: Search
    },
    {
      id: 'create',
      label: strings.pages.create.label,
      path: '/create',
      Icon: PlusCircle
    }
  ]

  return (
    <aside className={styles['sidebar']}>
      <header className={styles['heading']}>
        <Link href='/' className={styles['heading__logo']}>
          <Disc3 />
        </Link>
      </header>

      <nav className={styles['nav']}>
        <ul>
          {navLinks.map(({ id, label, path, Icon }) => (
            <li key={id}>
              <Link
                href={path}
                title={label}
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
