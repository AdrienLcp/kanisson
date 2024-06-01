import { LoaderCircleIcon } from 'lucide-react'
import React from 'react'

import { Motion } from '@/components/motion'
import { classNames } from '@/helpers/styles'

import './loader.styles.sass'

type LoaderVariant = 'circle'

type LoaderProps = {
  className?: string
  size?: 'small' | 'medium' | 'large'
  variant?: LoaderVariant
}

type LoaderVariantProps = Omit<LoaderProps, 'variant'>

const CircleLoader: React.FC<LoaderVariantProps> = ({ size, className }) => (
  <Motion animation='rotate' className='loader__circle'>
    <LoaderCircleIcon className={classNames(size, className)} />
  </Motion>
)

const loaders: Record<LoaderVariant, React.FC<LoaderProps>> = {
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
