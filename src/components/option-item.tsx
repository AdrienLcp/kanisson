import { CheckIcon, type LucideIcon } from 'lucide-react'
import React from 'react'
import type { Key } from 'react-aria-components'

import { Pressable } from '@/components/pressable'
import { classNames } from '@/helpers/styles'

import './option-item.styles.sass'

export type Option <T extends Key = string> = {
  /**
   * Additional class names to apply to the motion component.
   */
  className?: string

  /**
   * The icon to display on the left side of the option item.
   */
  Icon?: LucideIcon

  /**
   * Whether the option item is disabled.
   */
  isDisabled?: boolean

  /**
   * Whether the option item is prefixed by a divider.
   */
  isPrefixedByDivider?: boolean

  /**
   * Whether the option item is selected.
   */
  isSelected?: boolean

  /**
   * The key of the option item.
   */
  key: T

  /**
   * The label to display on the right side of the option item.
   */
  label: string

  /**
   * The function to call when the option item is clicked.
   */
  onClick?: (option: Option<T>) => void
}

type OptionItemProps = Omit<Option, 'isPrefixedByDivider' | 'key' | 'onClick'>

/**
 * The option item component. Need to be used inside a menu component who handle options user's choice.
 */
export const OptionItem: React.FC<OptionItemProps> = ({
  className,
  Icon,
  isDisabled,
  isSelected,
  label
}) => (
  <Pressable
    className={classNames(
      'option-item',
      Boolean(isSelected) && 'selected',
      className
    )}
    isDisabled={isDisabled}
  >
    <span className='option-item__left-box'>
      {Icon !== undefined && <Icon size='0.75rem' />}

      <span className='option-item__left-box__label'>
        {label}
      </span>
    </span>

    <div className='option-item__right-box'>
      {Boolean(isSelected) && <CheckIcon size='1.5rem' />}
    </div>
  </Pressable>
)
