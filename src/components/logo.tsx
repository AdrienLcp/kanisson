'use client'

import type { StaticImageData } from 'next/image'
import React from 'react'

import { Image } from '@/components/image'
import type { ComponentSizes } from '@/helpers/ui'
import { useI18n } from '@/i18n/client'

import smallLogo from '@/assets/images/logo/logo-48x48.png'
import mediumLogo from '@/assets/images/logo/logo-128x128.png'
import largeLogo from '@/assets/images/logo/logo-512x512.png'

import './logo.styles.sass'

type LogoSize = ComponentSizes

type LogoProps = {
  /** Additional class names to apply to the loader. */
  className?: string

  /**
   * Defines the size of the logo.
   * @values 'small', 'medium', 'large'
   * @default 'medium'
   */
  size?: ComponentSizes
}

type ImageInfo = {
  size: number
  src: StaticImageData
}

const logoMap: Record<LogoSize, ImageInfo> = {
  small: { size: 48, src: smallLogo },
  medium: { size: 128, src: mediumLogo },
  large: { size: 512, src: largeLogo }
}

/**
 * Logo component that displays the logo image.
 */
export const Logo: React.FC<LogoProps> = ({ className, size = 'medium' }) => {
  const { i18n } = useI18n()
  const selectedLogo = logoMap[size]

  return (
    <Image
      alt={i18n('components.logo.alt')}
      className={className}
      width={selectedLogo.size}
      height={selectedLogo.size}
      src={selectedLogo.src}
    />
  )
}
