'use client'

import Link from 'next/link'
import React from 'react'

import { Logo } from '@/app/components/logo'
import { DEFAULT_ICON_SIZE } from '@/helpers/styles'
import { useI18n } from '@/i18n'
import { getCommonNavbarItems, ROUTES } from '@/routes'
import type { NavBarProps } from '@/routes/components/navbar'

import './side-bar.styles.sass'

export const SideBar: React.FC<NavBarProps> = ({ authenticatedUserPermissions }) => {
  const { i18n } = useI18n()

  const navbarItems = getCommonNavbarItems(i18n, authenticatedUserPermissions)

  return (
    <aside className='side-bar'>
      <Link
        className='side-bar__heading'
        href={ROUTES.home}
      >
        <Logo className='side-bar__heading__logo' />
      </Link>

      <nav>
        <ul>
          {navbarItems.map(({ hasUserAccess, Icon, key, label, path }) => {
            if (!hasUserAccess) {
              return null
            }

            return (
              <li key={key}>
                <Link
                  className='side-bar__link'
                  href={path}
                >
                  <span className='side-bar__link__label'>
                    {label}
                  </span>

                  <Icon
                    className='side-bar__link__icon'
                    size={DEFAULT_ICON_SIZE}
                  />
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
