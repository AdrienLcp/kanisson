'use client'

import React from 'react'

import { classNames } from '@/helpers/styles'
import { baseFont, titleFont } from '@/helpers/ui'
import { useTheme } from '@/theme'
import { useHue } from '@/theme/hue'

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
