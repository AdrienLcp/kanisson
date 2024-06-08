import { K2D, Neuton } from 'next/font/google'
import type { Key } from 'react-aria-components'

export type ComponentSizes = 'small' | 'medium' | 'large'

export type Option <T extends Key> = {
  Icon?: React.ReactNode
  isDisabled?: boolean
  isPrefixedByDivider?: boolean
  isSelected?: boolean
  key: T
  label: string
  onClick?: (option: Option<T>) => void
}

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
