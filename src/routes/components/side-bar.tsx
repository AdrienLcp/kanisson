'use client'

import React from 'react'

import { useI18n } from '@/i18n/client'
import { getCommonNavbarItems } from '@/routes'

import './side-bar.styles.sass'
import { Logo } from '@/components/logo'

export const SideBar: React.FC = () => {
  const { i18n } = useI18n()

  const navbarItems = getCommonNavbarItems(i18n)

  return (
    <div className='side-bar'>
      <div>
        <Logo />
      </div>

      <nav>

      </nav>

      <div>
        autre footer
      </div>
    </div>
  )
}
