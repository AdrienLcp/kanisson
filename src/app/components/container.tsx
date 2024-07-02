'use client'

import React from 'react'

import { classNames } from '@/helpers/styles'
import { baseFont, titleFont } from '@/helpers/ui'
import { useI18n } from '@/i18n'
import { useTheme } from '@/theme'
import { useHue } from '@/theme/hue'

export const Container: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { currentHue } = useHue()
  const { currentLocale } = useI18n()
  const { isDarkModeActive } = useTheme()

  return (
    <html
      className={classNames(
        baseFont.variable,
        titleFont.variable,
        !isDarkModeActive && 'light',
        currentHue
      )}
      lang={currentLocale}
    >
      <body>
        {children}
      </body>
    </html>
  )
}
