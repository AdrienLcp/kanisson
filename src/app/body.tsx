'use client'

import React from 'react'

import { baseFont, titleFont } from '@/config/fonts'
import { classNames } from '@/helpers/styles'
import { useTheme } from '@/theme'
import { useHue } from '@/theme/hue'

import './body.styles.sass'

export const Body: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { currentHue } = useHue()
  const { isDarkModeActive } = useTheme()

  return (
    <body
      className={classNames(
        baseFont.variable,
        titleFont.variable,
        !isDarkModeActive && 'light',
        currentHue
      )}
    >
      {children}
    </body>
  )
}
