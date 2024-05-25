'use client'

import React from 'react'

import { baseFont, titleFont } from '@/config/fonts'
import { classNames } from '@/helpers/styles'
import type { Locale } from '@/i18n'

import './container.styles.sass'

type ContainerProps = React.PropsWithChildren & {
  locale: Locale
}

export const Container: React.FC<ContainerProps> = ({ children, locale }) => {
  return (
    <html
      lang={locale}
      className={classNames(
        baseFont.variable,
        titleFont.variable
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
