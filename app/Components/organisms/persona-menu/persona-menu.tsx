'use client'

import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

import { Popover, PopoverContent, PopoverTrigger } from '@/Components/base/ui/popover'
import { buttonVariants } from '@/Components/base/ui/button'
import { Skeleton } from '@/Components/base/ui/skeleton'

import type { FCWithStrings } from '@/Types'
import { Avatar, Button } from '@/Components'
import { login, logout } from '@/Lib'

import styles from './persona-menu.styles.module.sass'

const PersonaMenu: FCWithStrings = ({ strings }) => {
  const session = useSession()

  if (session.status === 'loading') return <Skeleton className={styles['skeleton']} />

  const isAuth = !!session.data

  const handleLogin = async () => await login()
  const handleLogout = async () => await logout()
  
  return (
    <Popover>
      <PopoverTrigger asChild={!isAuth}>
        {isAuth
          ? <Avatar
              user={session.data.user}
              strings={strings}
            />
          : <Button onClick={handleLogin}>
              {strings.app.actions.login}
            </Button>
        }          
      </PopoverTrigger>
      
      <PopoverContent className={styles['popover']}>
        <div className={styles['popover__links']}>
          <Link
            className={buttonVariants({ variant: 'link' })}
            href='/profile'
          >
            {strings.app.links.profile}
          </Link>

          <Link
            className={buttonVariants({ variant: 'link' })}
            href='/settings'
          >
            {strings.app.links.settings}
          </Link>
        </div>

        <Button
          variant='outline'
          onClick={handleLogout}
        >
          {strings.app.actions.logout}
        </Button>
      </PopoverContent>
    </Popover>
  )
}

export default PersonaMenu
