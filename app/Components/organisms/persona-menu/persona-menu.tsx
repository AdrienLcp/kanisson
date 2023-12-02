'use client'

import { Settings, User, LogOut, Mail, ShieldHalf } from 'lucide-react'
import Link from 'next/link'

import { Popover, PopoverContent, PopoverTrigger } from '@/Components/base/ui/popover'
import { buttonVariants } from '@/Components/base/ui/button'

import type { NavLink, User as TUser } from '@/Types'
import { Avatar, Button } from '@/Components'
import { useLocale } from '@/Hooks'
import { ROUTES } from '@/Config'
import { logout } from '@/Lib'

import styles from './persona-menu.styles.module.sass'

type PersonaMenuProps = {
  user: TUser
}

const PersonaMenu: React.FC<PersonaMenuProps> = ({ user }) => {
  const { strings } = useLocale()

  const handleLogout = async () => await logout()

  const personaMenuLinks: NavLink[] = [
    {
      id: ROUTES.profile.id,
      path: ROUTES.profile.path,
      label: strings.pages.profile.label,
      Icon: User,
      isVisible: true
    },
    {
      id: ROUTES.dashboard.id,
      path: ROUTES.dashboard.path,
      label: strings.pages.dashboard.label,
      Icon: ShieldHalf,
      isVisible: ROUTES.dashboard.roles.includes(user.role)
    },
    {
      id: ROUTES.contact.id,
      path: ROUTES.contact.path,
      label: strings.pages.contact.label,
      Icon: Mail,
      isVisible: true
    },
    {
      id: ROUTES.settings.id,
      path: ROUTES.settings.path,
      label: strings.pages.settings.label,
      Icon: Settings,
      isVisible: true
    }
  ]

  return (
    <Popover>
      <PopoverTrigger>
        <Avatar user={user} />
      </PopoverTrigger>
      
      <PopoverContent className={styles['popover']}>
        {user.name && (
          <h2 className={styles['popover__username']}>
            {user.name}
          </h2>
        )}

        <div className={styles['popover__content']}>
          {personaMenuLinks.map(({ id, label, Icon, path, isVisible }) => isVisible && (
            <Link
              key={id}
              href={path}
              className={buttonVariants({ variant: 'ghost' })}
            >
              <Icon size='1.2em' />

              <span className={styles['popover__content__item-label']}>
                {label}
              </span>
            </Link>
          ))}
        </div>

        <Button
          variant='destructive'
          onClick={handleLogout}
        >
          <LogOut size='1.2em' strokeWidth='3' />
          
          <span className={styles['popover__content__item-label']}>
            {strings.actions.logout}
          </span>
        </Button>
      </PopoverContent>
    </Popover>
  )
}

export default PersonaMenu
