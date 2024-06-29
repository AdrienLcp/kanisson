import React from 'react'
import { Label as ReactAriaLabel, type LabelProps } from 'react-aria-components'

import { isValidChildren } from '@/lib/react'

export const Label: React.FC<LabelProps> = ({ children, ...props }) => {
  if (!isValidChildren(children)) {
    return null
  }

  return (
    <ReactAriaLabel {...props}>
      {children}
    </ReactAriaLabel>
  )
}
