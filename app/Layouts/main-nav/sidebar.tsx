import { Disc3, Home, PlusCircle, Search, Youtube } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

import type { NavLink } from '@root/app/Types'
import { getPathnameWithoutLocale } from '@/Helpers'
import { useAuth, useLocale } from '@/Hooks'
import { ROUTES } from '@/Config'
import { Tooltip } from '@/Components'
import { cn } from '@/Lib'

import styles from './sidebar.styles.module.sass'
import { useToast } from '@root/app/Components/base/ui/use-toast'

const Sidebar: React.FC = () => {
  const { strings } = useLocale()
  const { user } = useAuth()
  const pathname = usePathname()
  const currentPath = getPathnameWithoutLocale(pathname)

  const { toast } = useToast()

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
                <Tooltip content={label}>
                  <Icon size='1.2em' className={styles['icon']} />

                  <div className={styles['overlay']}>
                    <Icon size='1.2em' />
                    <span>{label}</span>
                  </div>
                </Tooltip>
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
