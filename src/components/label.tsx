import React from 'react'
import { Label as ReactAriaLabel, type LabelProps } from 'react-aria-components'

import { isValidString } from '@/helpers/strings'

export const Label: React.FC<LabelProps> = ({ children, ...props }) => {
  if (!isValidString(children)) {
    return null
  }

  return (
    <ReactAriaLabel {...props}>
      {children}
    </ReactAriaLabel>
  )
}
