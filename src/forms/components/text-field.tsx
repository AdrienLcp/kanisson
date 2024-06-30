import React from 'react'
import { Input } from 'react-aria-components'

import { BaseTextField, type BaseTextFieldProps } from '@/forms/components/base-text-field'
import { classNames } from '@/helpers/styles'

import './text-field.styles.sass'

export const TextField: React.FC<BaseTextFieldProps> = ({ hasError, placeholder, ...props }) => (
  <BaseTextField {...props}>
    <Input
      className={classNames('text-field', hasError && 'invalid')}
      placeholder={placeholder}
    />
  </BaseTextField>
)
