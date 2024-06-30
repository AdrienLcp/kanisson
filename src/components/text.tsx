import React from 'react'
import { Text as ReactAriaText, type TextProps } from 'react-aria-components'

import { areValidChildren } from '@/lib/react'

export const Text: React.FC<TextProps> = ({ children, ...props }) => {
  if (!areValidChildren(children)) {
    return null
  }

  return (
    <ReactAriaText {...props}>
      {children}
    </ReactAriaText>
  )
}
