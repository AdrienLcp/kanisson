import { CheckIcon } from 'lucide-react'
import React from 'react'

import { classNames } from '@/helpers/styles'

import './menu-item.styles.sass'

type MenuItemProps = {
  className?: string
  Icon?: React.ReactNode
  isDisabled?: boolean
  isPrefixedByDivider?: boolean
  isSelected?: boolean
  label: string
}

export const MenuItem: React.FC<MenuItemProps> = ({
  className,
  Icon,
  isDisabled,
  isSelected,
  label
}) => (
  <div className={classNames(
    'menu-item',
    Boolean(isSelected) && 'selected',
    Boolean(isDisabled) && 'disabled',
    className
  )}>
    <div className='menu-item__box'>
      {Icon !== undefined && Icon}

      {label}
    </div>

    {Boolean(isSelected) && <CheckIcon size='1.5rem' />}
  </div>
)
