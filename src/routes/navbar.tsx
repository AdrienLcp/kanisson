'use client'

import { HomeIcon, PlusCircleIcon, SearchIcon, type LucideIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React from 'react'

import { Logo } from '@/app/components/logo'
import { useAuthentication } from '@/authentication/client'
import type { UserPermission } from '@/authentication/permissions'
import { Motion } from '@/components/motion'
import { classNames } from '@/helpers/styles'
import { useBreakpoints } from '@/hooks/breakpoints'
import type { I18n } from '@/i18n'
import { useI18n } from '@/i18n/client'
import { Link } from '@/i18n/components/link'
import { ROUTES, type RouteKey, type RoutePath } from '@/routes'

import './navbar.styles.sass'

export type NavLink = {
  ariaLabel: string
  hasUserAccess: boolean
  Icon: LucideIcon
  key: RouteKey
  label: string
  path: RoutePath
}

export const getNavbarItems = (i18n: I18n, userPermissions: UserPermission[]) => {
  const navbarConfig: NavLink[] = [
    {
      ariaLabel: i18n('routes.home.link-aria-label'),
      hasUserAccess: true,
      key: 'home',
      label: i18n('routes.home.link-label'),
      path: ROUTES.home,
      Icon: HomeIcon
    },
    {
      ariaLabel: i18n('routes.search.link-aria-label'),
      hasUserAccess: true,
      key: 'search',
      label: i18n('routes.search.link-label'),
      path: ROUTES.search,
      Icon: SearchIcon
    },
    {
      ariaLabel: i18n('routes.create.link-aria-label'),
      hasUserAccess: userPermissions.includes('create_playlist'),
      key: 'create',
      label: i18n('routes.create.link-label'),
      path: ROUTES.create,
      Icon: PlusCircleIcon
    }
  ]

  return navbarConfig
}

export const Navbar: React.FC = () => {
  const pathname = usePathname()

  const { authentication, authenticatedUserPermissions } = useAuthentication()
  const isMobile = useBreakpoints()
  const { i18n } = useI18n()

  const links = getNavbarItems(i18n, authenticatedUserPermissions)

  return (
    <aside>
      <Motion animation='fade-in-slow' className='navbar'>
        {!isMobile && (
          <div className='navbar__heading'>
            <Link href={ROUTES.home} className='navbar__heading__logo'>
              <Logo className='navbar__heading__logo' />
            </Link>
          </div>
        )}

        {authentication.status !== 'loading' && (
          <Motion animation='fade-in'>
            <ul className='navbar__list'>
              {links.map(({ ariaLabel, hasUserAccess, Icon, key, label, path }) => {
                if (!hasUserAccess) {
                  return null
                }

                return (
                  <li key={key}>
                    <Link
                      aria-label={ariaLabel}
                      className={classNames('navbar__list__link', pathname === path && 'selected')}
                      href={path}
                    >
                      <span className='navbar__list__link__label'>
                        {label}
                      </span>

                      <Icon
                        className='navbar__list__link__icon'
                        size={isMobile ? '1.8rem' : '0.75rem'}
                      />
                    </Link>
                  </li>
                )
              })}
            </ul>
          </Motion>
        )}
      </Motion>
    </aside>
  )
}
