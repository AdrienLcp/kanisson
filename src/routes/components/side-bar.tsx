'use client'

import React from 'react'

import { Logo } from '@/components/logo'
import { DEFAULT_ICON_SIZE } from '@/helpers/styles'
import { Link } from '@/i18n/components/link'
import { useI18n } from '@/i18n/client'
import { getCommonNavbarItems, ROUTES } from '@/routes'

import './side-bar.styles.sass'

export const SideBar: React.FC = () => {
  const { i18n } = useI18n()

  const navbarItems = getCommonNavbarItems(i18n)

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
          {navbarItems.map(({ Icon, key, label, path }) => (
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
          ))}
        </ul>
      </nav>
    </aside>
  )
}
