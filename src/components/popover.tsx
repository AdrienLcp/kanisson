'use client'

import React from 'react'
import { Popover as ReactAriaPopover, type PopoverProps } from 'react-aria-components'

import { getReactAriaClassName } from '@/helpers/styles'

import './popover.styles.sass'

export const Popover: React.FC<PopoverProps> = ({ children, className, ...props }) => (
  <ReactAriaPopover
    {...props}
    className={(values) => getReactAriaClassName(values, className, 'popover')}
  >
    {children}
  </ReactAriaPopover>
)
