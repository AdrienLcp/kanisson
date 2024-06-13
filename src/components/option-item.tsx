import { CheckIcon, type LucideIcon } from 'lucide-react'
import React from 'react'
import { Separator, type Key } from 'react-aria-components'

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
  id: T

  /**
   * The label to display on the right side of the option item.
   */
  label: string

  /**
   * The function to call when the option item is clicked.
   */
  onClick?: (option: Option<T>) => void
}

const handleOptionItemClick = (option: Option) => {
  if (typeof option.onClick === 'function') {
    option.onClick(option)
  }
}

/**
 * The option item component. Need to be used inside a menu component who handle options user's choice.
 */
export const OptionItem: React.FC<Option> = ({
  className,
  Icon,
  isDisabled,
  isPrefixedByDivider,
  isSelected,
  id,
  label,
  onClick
}) => {
  if (isPrefixedByDivider) {
    return <Separator />
  }

  return (
    <Pressable
      className={classNames(
        'option-item',
        Boolean(isSelected) && 'selected',
        Boolean(isDisabled) && 'disabled',
        className
      )}
      isDisabled={isDisabled}
      onPress={() => {
        handleOptionItemClick({ className, Icon, isDisabled, isPrefixedByDivider, isSelected, id, label, onClick })
      }}
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
}
