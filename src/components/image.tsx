import NextImage, { type ImageProps } from 'next/image'
import React from 'react'

import { classNames } from '@/helpers/styles'

import './image.styles.sass'

const DEFAULT_IMAGE_SIZE = 200

export const Image: React.FC<ImageProps> = ({ className, ...props }) => (
  <NextImage
    fetchPriority='low'
    loading='lazy'
    height={DEFAULT_IMAGE_SIZE}
    width={DEFAULT_IMAGE_SIZE}
    {...props}
    className={classNames('image', className)}
  />
)
