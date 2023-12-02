import { Mail, Settings } from 'lucide-react'
import Link from 'next/link'

import { buttonVariants } from '@root/app/Components/base/ui/button'

import type { NavLink } from '@/Types'
import { Button, PersonaMenu } from '@/Components'
import { useAuth, useLocale } from '@/Hooks'
import { ROUTES } from '@/Config'
import { login } from '@/Lib'

import styles from './header.styles.module.sass'

const Header: React.FC = () => {
  const { strings } = useLocale()
  const { user } = useAuth()

  const handleLogin = async () => await login()

  const headerLinks: NavLink[] = [
    {
      id: ROUTES.contact.id,
      path: ROUTES.contact.path,
      Icon: Mail,
      isVisible: true
    },
    {
      id: ROUTES.settings.id,
      path: ROUTES.settings.path,
      Icon: Settings,
      isVisible: true
    }
  ]

  return (
    <header className={styles['header']}>
      <h1 className={styles['header__title']}>
        {strings.app.title}
      </h1>

      {user
        ? <PersonaMenu user={user} />
        : <div className={styles['header__controls']}>
            <ul className={styles['header__controls__links']}>
              {headerLinks.map(({ id, path, Icon, isVisible }) => isVisible && (
                <li key={id}>
                  <Link
                    className={buttonVariants({ variant: 'ghost', size: 'icon' })}
                    href={path}
                  >
                    <Icon />
                  </Link>
                </li>
              ))}
            </ul>

            <Button onClick={handleLogin}>
              {strings.actions.login}
            </Button>
          </div>
      }
    </header>
  )
}

export default Header
