import React from 'react'
import { Label as ReactAriaLabel, type LabelProps as ReactAriaLabelProps } from 'react-aria-components'

import { areValidChildren } from '@/lib/react'

type LabelProps = ReactAriaLabelProps & {
  isRequired?: boolean
}

export const Label: React.FC<LabelProps> = ({ children, isRequired, ...props }) => {
  if (!areValidChildren(children)) {
    return null
  }

  return (
    <ReactAriaLabel {...props}>
      {children} {isRequired && (<>*</>)}
    </ReactAriaLabel>
  )
}
