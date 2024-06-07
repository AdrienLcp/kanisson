'use client'

import { LoaderCircleIcon, type LucideIcon } from 'lucide-react'
import React from 'react'

import { Motion } from '@/components/motion'
import { classNames } from '@/helpers/styles'

import './button.styles.sass'

type BaseButtonProps = Omit<React.ComponentProps<'button'>, 'disabled'>

type ButtonProps = BaseButtonProps & {
  /**
   * Optional icon to display within the button.
   * @type {LucideIcon}
   */
  Icon?: LucideIcon

  /**
   * Determines the side of the button the icon should appear on. Defaults to 'left'.
   * @default 'left'
   */
  iconSide?: 'left' | 'right'

  /**
   * If true, disables the button interaction.
   */
  isDisabled?: boolean

  /**
   * Shows a loading spinner inside the button when true.
   */
  isLoading?: boolean

  /**
   * Defines the size of the button. Can be 'default' or 'icon' for a button with only an icon.
   * @default 'default'
   */
  size?: 'default' | 'icon'

  /**
   * The visual style variant of the button.
   * @default 'outline'
   */
  variant?: 'destructive' | 'outline' | 'ghost' | 'primary' | 'secondary'
}

/**
 * Button component that supports optional icons, loading state, and icon size.
 */
export const Button: React.FC<ButtonProps> = ({
  className,
  children,
  Icon,
  iconSide = 'left',
  isDisabled,
  isLoading,
  size = 'default',
  type = 'button',
  variant = 'outline',
  ...props
}) => {
  const hasIcon = Icon !== undefined

  const renderIcon = () => {
    if (!hasIcon) {
      return null
    }

    if (isLoading === true) {
      return (
        <Motion animation='rotate'>
          <LoaderCircleIcon className='button__icon' size={20} />
        </Motion>
      )
    }

    return <Icon className='button__icon' />
  }

  return (
    <button
      aria-busy={isLoading}
      {...props}
      disabled={isDisabled || isLoading}
      type={type}
      className={classNames(
        'button',
        hasIcon && `icon-${iconSide}`,
        size !== 'default' && `${size}-size`,
        variant,
        className
      )}
    >
      {renderIcon()}

      {children}
    </button>
  )
}
