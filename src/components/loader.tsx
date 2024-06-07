import { LoaderCircleIcon } from 'lucide-react'
import React from 'react'

import { Motion } from '@/components/motion'

import './loader.styles.sass'

type LoaderSize = 'small' | 'medium' | 'large'
type LoaderVariant = 'circle'

type LoaderProps = {
  className?: string
  size?: LoaderSize
  variant?: LoaderVariant
}

type LoaderVariantProps = Omit<LoaderProps, 'size' | 'variant'> & {
  size: LoaderSize
}

const sizes: Record<LoaderSize, string> = {
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

export const Loader: React.FC<LoaderProps> = ({
  className,
  size = 'medium',
  variant = 'circle'
}) => {
  const SelectedLoader = loaders[variant]
  return <SelectedLoader size={size} className={className} />
}
