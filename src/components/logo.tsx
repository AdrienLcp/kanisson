import React from 'react'
// import type { StaticImageData } from 'next/image'

import type { ComponentSizes } from '@/helpers/ui'

import logo from '@/assets/images/logo/png/logo-192x192.png'

import './logo.styles.sass'
import Image from 'next/image'

type LogoProps = {
  /**
   * Defines the size of the logo. Adapt text size if <LogoTitle /> component is used.
   * @values 'small', 'medium', 'large'
   * @default 'medium'
   */
  size?: ComponentSizes
}

// type ImageInfo = {
//   url: StaticImageData
//   size: number
// }

// const logoMap: Record<LogoSize, ImageInfo> = {
//   small: { url: logoSmall, size: 24 },
//   medium: { url: logoMedium, size: 48 },
//   large: { url: logoLarge, size: 96 },
//   xLarge: { url: logoXLarge, size: 144 }
// }

export const Logo: React.FC<LogoProps> = () => {
  return (
    <div className='logo'>
      <Image
        alt='logo'
        width={192}
        height={192}
        src={logo}
      />
    </div>
  )
}
