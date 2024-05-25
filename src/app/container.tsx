'use client'

import React from 'react'

import { baseFont, titleFont } from '@/config/fonts'
import { classNames } from '@/helpers/styles'
import type { Locale } from '@/i18n'
import { useTheme } from '@/theme'
import { useHue } from '@/theme/hue'

import './container.styles.sass'

type ContainerProps = React.PropsWithChildren & {
  locale: Locale
}

export const Container: React.FC<ContainerProps> = ({ children, locale }) => {
  const { currentHue } = useHue()
  const { isDarkModeActive } = useTheme()

  return (
    <html
      lang={locale}
      className={classNames(
        baseFont.variable,
        titleFont.variable,
        !isDarkModeActive && 'light',
        currentHue
      )}
    >
      <body>
        <header />

        <main>
          {children}
        </main>

        <footer />
      </body>
    </html>
  )
}
