'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import { classNames } from '@/helpers/styles'
import { useI18n } from '@/i18n/client'
import { type NavLink, getCommonNavbarItems } from '@/routes'

import './bottom-bar.styles.sass'

const MIN_ITEM_WIDTH_VALUE_IN_CH = 5

const getBottomBarStyle = (bottomBarItems: NavLink[]): Record<string, string> => {
  const longestLabel = bottomBarItems.reduce((longest, current) => {
    return current.label.length > longest.label.length
      ? current
      : longest
  }, bottomBarItems[0]).label

  const itemWidthInCh = longestLabel.length > MIN_ITEM_WIDTH_VALUE_IN_CH
    ? longestLabel.length
    : MIN_ITEM_WIDTH_VALUE_IN_CH

  const bottomItemStyle: Record<string, string> = {
    '--bottom-bar-min-width': `${itemWidthInCh}ch`
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
        {bottomBarItems.map(({ Icon, key, path }) => {
          const isSelected = pathname === path

          return (
            <li key={key}>
              <Link
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
