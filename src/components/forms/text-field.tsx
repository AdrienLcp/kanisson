import React from 'react'
import { Input } from 'react-aria-components'

import { BaseTextField, type BaseTextFieldProps } from '@/components/forms/base-text-field'

import './text-field.styles.sass'

export const TextField: React.FC<BaseTextFieldProps> = ({ placeholder, ...props }) => (
  <BaseTextField {...props}>
    <Input
      className='text-field'
      placeholder={placeholder}
    />
  </BaseTextField>
)
