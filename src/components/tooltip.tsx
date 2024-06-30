import React from 'react'
import {
  Tooltip as ReactAriaTooltip,
  type TooltipProps as ReactAriaTooltipProps,
  TooltipTrigger
} from 'react-aria-components'

import { getReactAriaClassName } from '@/helpers/styles'

import './tooltip.styles.sass'
import { isValidChildren } from '@/lib/react'

type TooltipProps = ReactAriaTooltipProps & React.PropsWithChildren & {
  /** The content to display in the tooltip. */
  content?: React.ReactNode

  /** Delay to close the tooltip. */
  closeDelay?: number

  /** Delay to display the tooltip. */
  delay?: number
}

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  className,
  closeDelay = 150,
  delay = 500,
  offset = 8,
  ...props
}) => {
  if (!isValidChildren(content)) {
    return children
  }

  return (
    <TooltipTrigger closeDelay={closeDelay} delay={delay}>
      {children}

      <ReactAriaTooltip
        {...props}
        className={(values) => getReactAriaClassName(values, className, 'tooltip')}
        offset={offset}
      >
        {content}
      </ReactAriaTooltip>
    </TooltipTrigger>
  )
}
