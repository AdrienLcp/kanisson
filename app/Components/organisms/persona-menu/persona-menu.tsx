'use client'

import type { DefaultUser } from 'next-auth'
import { LucideIcon, Settings, User, LogOut } from 'lucide-react'
import Link from 'next/link'

import { Popover, PopoverContent, PopoverTrigger } from '@/Components/base/ui/popover'
import { buttonVariants } from '@/Components/base/ui/button'

import { Avatar, Button } from '@/Components'
import { useLocale } from '@/Hooks'
import { ROUTES } from '@/Config'
import { logout } from '@/Lib'

import styles from './persona-menu.styles.module.sass'

type PersonaMenuProps = {
  user: DefaultUser
}

type PersonaMenuLink = {
  label: string
  href: string
  Icon: LucideIcon
}

const PersonaMenu: React.FC<PersonaMenuProps> = ({ user }) => {
  const { strings } = useLocale()

  const handleLogout = async () => await logout()

  const personaMenuLinks: PersonaMenuLink[] = [
    {
      label: strings.app.links.profile,
      href: ROUTES.profile.path,
      Icon: User
    },
    {
      label: strings.app.links.settings,
      href: ROUTES.settings.path,
      Icon: Settings
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
          {personaMenuLinks.map(({ label, href, Icon }) => (
            <Link
              key={href}
              href={href}
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
            {strings.app.actions.logout}
          </span>
        </Button>
      </PopoverContent>
    </Popover>
  )
}

export default PersonaMenu
