'use client'

import type { LucideIcon } from 'lucide-react'
import React from 'react'

import { Loader } from '@/components/loader'
import { classNames } from '@/helpers/styles'

import './button.styles.sass'

type BaseButtonProps = Omit<React.ComponentProps<'button'>, 'disabled'>

type ButtonProps = BaseButtonProps & {
  Icon?: LucideIcon
  iconSide?: 'left' | 'right'
  isDisabled?: boolean
  isLoading?: boolean
  size?: 'default' | 'icon'
  variant?: 'destructive' | 'filled' | 'outlined' | 'tonal' | 'transparent'
}

export const Button: React.FC<ButtonProps> = ({
  className,
  children,
  Icon,
  iconSide = 'left',
  isDisabled,
  isLoading,
  size = 'default',
  type = 'button',
  variant = 'outlined',
  ...props
}) => {
  const hasIcon = Icon !== undefined

  const renderIcon = () => {
    if (!hasIcon) {
      return null
    }

    if (isLoading === true) {
      return <Loader className='button__icon' />
    }

    return <Icon className='button__icon' />
  }

  return (
    <button
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
