'use client'

import React from 'react'

import { Logo } from '@/components/logo'
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

      <nav className='side-bar__nav'>
        <ul>
          {navbarItems.map(({ Icon, key, label, path }) => (
            <li key={key} className='side-bar__item'>
              <Icon
                className='side-bar__item__icon'
                size='0.75rem'
              />

              <Link
                className='side-bar__item__link'
                href={path}
              >
                <Icon
                  className='side-bar__item__link__icon'
                  size='0.75rem'
                />

                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
