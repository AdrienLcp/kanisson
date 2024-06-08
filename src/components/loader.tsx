import { LoaderCircleIcon } from 'lucide-react'
import React from 'react'

import { Motion } from '@/components/motion'
import type { ComponentSizes } from '@/config/ui'
import type { ResponsiveSize } from '@/helpers/styles'

import './loader.styles.sass'

type LoaderSize = ComponentSizes
type LoaderVariant = 'circle'

type LoaderProps = {

  /**
   * Additional class names to apply to the loader.
   */
  className?: string

  /**
   * Size of the loader.
   * @values 'small', 'medium', 'large'
   * @default 'medium'
   */
  size?: LoaderSize

  /**
   * Visual style variant of the loader.
   * @values 'circle'
   * @default 'circle'
   */
  variant?: LoaderVariant
}

type LoaderVariantProps = Omit<LoaderProps, 'size' | 'variant'> & {
  size: LoaderSize
}

const sizes: Record<LoaderSize, ResponsiveSize> = {
  small: '1rem',
  medium: '3rem',
  large: '6rem'
}

const CircleLoader: React.FC<LoaderVariantProps> = ({ size, className }) => (
  <Motion animation='rotate' className='loader__circle'>
    <LoaderCircleIcon className={className} size={sizes[size]} />
  </Motion>
)

const loaders: Record<LoaderVariant, React.FC<LoaderVariantProps>> = {
  'circle': CircleLoader
}

/**
 * Loader component that displays a spinning circle by default.
 */
export const Loader: React.FC<LoaderProps> = ({
  className,
  size = 'medium',
  variant = 'circle'
}) => {
  const SelectedLoader = loaders[variant]
  return <SelectedLoader size={size} className={className} />
}
