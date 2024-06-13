import type { LucideIcon } from 'lucide-react'
import { K2D, Neuton } from 'next/font/google'
import type { Key } from 'react-aria-components'

export type ComponentSizes = 'small' | 'medium' | 'large'

// /!\ Careful /!\
// Font's variable name need to match with one of variable names used in src/styles/typography.sass

export const baseFont = K2D({
  subsets: ['latin'],
  variable: '--font-base',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800']
})

export const titleFont = Neuton({
  subsets: ['latin'],
  variable: '--font-title',
  weight: ['200', '300', '400', '700', '800']
})

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
   * The callback to call when the option item is clicked.
   * Wrap it by pressable, link or equivalent & give option's onClick to it
   * @param option The option item that was clicked.
   */
  onClick?: (option: Option<T>) => void
}
