import React from 'react'
import { Input } from 'react-aria-components'

import { BaseTextField, type BaseTextFieldProps } from '@/forms/components/base-text-field'

import './text-field.styles.sass'

export const TextField: React.FC<BaseTextFieldProps> = ({ placeholder, isInvalid, ...props }) => (
  <BaseTextField {...props}>
    <Input
      className='text-field'
      style={{ borderColor: isInvalid ? 'red': 'green' }}
      placeholder={placeholder}
    />
  </BaseTextField>
)
