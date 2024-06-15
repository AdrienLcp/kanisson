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
    <div className='side-bar'>
      <Link
        className='side-bar__heading'
        href={ROUTES.home}
      >
        <Logo className='side-bar__heading__logo' />
      </Link>

      <nav>
        <ul>
          {navbarItems.map(item => (
            <li key={item.path}>
              {item.label}
            </li>
          ))}
        </ul>
      </nav>

      <div>
        autre footer
      </div>
    </div>
  )
}
