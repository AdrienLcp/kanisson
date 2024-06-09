'use client'

import React from 'react'

import { classNames } from '@/helpers/styles'
import { baseFont, titleFont } from '@/helpers/ui'
import type { Locale } from '@/i18n'
import { useTheme } from '@/theme'
import { useHue } from '@/theme/hue'

type ContainerProps = React.PropsWithChildren & {
  locale: Locale
}

export const Container: React.FC<ContainerProps> = ({ children, locale }) => {
  const { currentHue } = useHue()
  const { isDarkModeActive } = useTheme()

  return (
    <html
      className={classNames(
        baseFont.variable,
        titleFont.variable,
        !isDarkModeActive && 'light',
        currentHue
      )}
      lang={locale}
    >
      <body>
        {children}
      </body>
    </html>
  )
}
