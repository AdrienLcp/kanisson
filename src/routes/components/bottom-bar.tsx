'use client'

import { usePathname } from 'next/navigation'
import React from 'react'

import { classNames, type Style } from '@/helpers/styles'
import { useI18n } from '@/i18n/client'
import { Link } from '@/i18n/components/link'
import { type NavLink, getCommonNavbarItems } from '@/routes'

import './bottom-bar.styles.sass'

const getBottomBarStyle = (bottomBarItems: NavLink[]) => {
  const bottomItemStyle: Style = {
    '--bottom-bar-item-count': `${bottomBarItems.length}`
  }

  return bottomItemStyle
}

export const BottomBar: React.FC = () => {
  const { i18n } = useI18n()
  const pathname = usePathname()

  const bottomBarItems = getCommonNavbarItems(i18n)
  const bottomBarStyle = getBottomBarStyle(bottomBarItems)

  return (
    <nav className='bottom-bar'>
      <ul
        className='bottom-bar__list'
        style={bottomBarStyle}
      >
        {bottomBarItems.map(({ ariaLabel, Icon, key, path }) => {
          const isSelected = pathname === path

          return (
            <li key={key}>
              <Link
                aria-label={ariaLabel}
                className={classNames('bottom-bar__list__item', isSelected && 'selected')}
                href={path}
              >
                <Icon size='1.8rem' />
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
