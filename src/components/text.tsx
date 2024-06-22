import React from 'react'
import { Text as ReactAriaText, type TextProps } from 'react-aria-components'

export const Text: React.FC<TextProps> = ({ children, ...props }) => {
  if (children == null || children === '') {
    return null
  }

  return (
    <ReactAriaText {...props}>
      {children}
    </ReactAriaText>
  )
}
