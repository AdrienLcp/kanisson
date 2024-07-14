'use client'

import { ImageIcon } from 'lucide-react'
import NextImage, { type ImageProps as NextImageProps } from 'next/image'
import React from 'react'

import { classNames } from '@/helpers/styles'

import './image.styles.sass'

const DEFAULT_IMAGE_SIZE = 52

type ImageProps = Omit<NextImageProps, 'src'> & {
  src?: NextImageProps['src'] | null
}

export const Image: React.FC<ImageProps> = ({
  className,
  height = DEFAULT_IMAGE_SIZE,
  onError,
  src,
  width = DEFAULT_IMAGE_SIZE,
  ...props
}) => {
  const [hasImageError, setHasImageError] = React.useState<boolean>(false)

  if (hasImageError || src == null) {
    return <ImageIcon height={height} width={width} />
  }

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setHasImageError(true)

    if (typeof onError === 'function') {
      onError(event)
    }
  }

  return (
    <NextImage
      fetchPriority='low'
      loading='lazy'
      onError={handleImageError}
      src={src}
      {...props}
      height={height}
      className={classNames('image', className)}
      width={width}
    />
  )
}
