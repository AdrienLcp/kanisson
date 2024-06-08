'use client'

import React from 'react'
import { Button, type ButtonProps } from 'react-aria-components'

import { getReactAriaClassName } from '@/helpers/styles'

import './pressable.styles.sass'

export const Pressable: React.FC<ButtonProps> = ({ children, className, ...props }) => (
  <Button {...props} className={(values) => getReactAriaClassName(values, className, 'pressable')}>
    {children}
  </Button>
)
