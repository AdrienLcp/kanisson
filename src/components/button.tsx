'use client'

import { LoaderCircleIcon, type LucideIcon } from 'lucide-react'
import React from 'react'
import type { ButtonProps as ReactAriaButtonProps, ButtonRenderProps } from 'react-aria-components'

import { Motion } from '@/components/motion'
import { Pressable } from '@/components/pressable'
import { classNames, getReactAriaClassName } from '@/helpers/styles'

import './button.styles.sass'

type ButtonIconSide = 'left' | 'right'
type ButtonSize = 'default' | 'icon'
type ButtonVariant = 'destructive' | 'outline' | 'ghost' | 'primary' | 'secondary'

type ButtonProps = ReactAriaButtonProps & {
  /**
   * Optional icon to display within the button.
   * @type {LucideIcon}
   */
  Icon?: LucideIcon

  /**
   * Determines the side of the button the icon should appear on. Defaults to 'left'.
   * @values 'left', 'right'
   * @default 'left'
   */
  iconSide?: ButtonIconSide

  /**
   * Shows a loading spinner inside the button when true.
   */
  isLoading?: boolean

  /**
   * Defines the size of the button. Can be 'default' or 'icon' for a button with only an icon.
   * @values 'default', 'icon'
   * @default 'default'
   */
  size?: ButtonSize

  /**
   * The visual style variant of the button.
   * @values 'primary', 'secondary', 'outline', 'ghost', 'destructive'
   * @default 'outline'
   */
  variant?: ButtonVariant
}

const getButtonIcon = (Icon?: LucideIcon, isLoading?: boolean) => {
  if (Icon == null) {
    return null
  }

  if (isLoading === true) {
    return (
      <Motion animation='infinite-rotate'>
        <LoaderCircleIcon className='button__icon' size={20} />
      </Motion>
    )
  }

  return <Icon className='button__icon' />
}

const getButtonClassName = (
  values: ButtonRenderProps & { defaultClassName: string | undefined },
  className: ReactAriaButtonProps['className'],
  iconSide: ButtonIconSide,
  variant: ButtonVariant,
  size: ButtonSize,
  Icon?: LucideIcon
) => {
  const buttonBaseClassName = classNames(
    'button',
    Icon !== undefined && `icon-${iconSide}`,
    size !== 'default' && `${size}-size`,
    variant
  )

  return getReactAriaClassName(values, className, buttonBaseClassName)
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
  variant = 'outline',
  ...props
}) => (
  <Pressable
    {...props}
    className={(values) => getButtonClassName(values, className, iconSide, variant, size, Icon)}
    isDisabled={isDisabled || isLoading}
  >
    <>
      {getButtonIcon(Icon, isLoading)}
      {children}
    </>
  </Pressable>
)
