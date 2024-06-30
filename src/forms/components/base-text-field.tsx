import React from 'react'
import { TextField, type TextFieldProps } from 'react-aria-components'

import type { CommonFormFieldProps } from '@/forms'
import { BaseField } from '@/forms/components/base-field'
import { getReactAriaClassName } from '@/helpers/styles'

import './base-text-field.styles.sass'

export type BaseTextFieldProps = TextFieldProps & CommonFormFieldProps

export const BaseTextField: React.FC<BaseTextFieldProps> = ({
  children,
  className,
  description,
  isRequired,
  label,
  ...props
}) => (
  <TextField
    {...props}
    className={(values) => getReactAriaClassName(values, className, 'base-text-field')}
    isRequired={isRequired}
  >
    <BaseField
      description={description}
      isRequired={isRequired}
      label={label}
    >
      <>{children}</>
    </BaseField>
  </TextField>
)
