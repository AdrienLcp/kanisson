import { CheckIcon, type LucideIcon } from 'lucide-react'
import React from 'react'
import type { Key } from 'react-aria-components'

import { classNames } from '@/helpers/styles'

import './option-item.styles.sass'

export type Option <T extends Key = string> = {
  Icon?: LucideIcon
  isDisabled?: boolean
  isPrefixedByDivider?: boolean
  isSelected?: boolean
  key: T
  label: string
  onClick?: (option: Option<T>) => void
}

type OptionItemProps = {
  className?: string
  Icon?: LucideIcon
  isDisabled?: boolean
  isSelected?: boolean
  label: string
}

export const OptionItem: React.FC<OptionItemProps> = ({
  className,
  Icon,
  isDisabled,
  isSelected,
  label
}) => (
  <div className={classNames(
    'option-item',
    Boolean(isSelected) && 'selected',
    Boolean(isDisabled) && 'disabled',
    className
  )}>
    <span className='option-item__left-box'>
      {Icon !== undefined && <Icon size='0.75rem' />}

      <span className='option-item__left-box__label'>
        {label}
      </span>
    </span>

    <div className='option-item__right-box'>
      {Boolean(isSelected) && <CheckIcon size='1.5rem' />}
    </div>
  </div>
)
