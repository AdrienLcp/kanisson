import React from 'react'
import { TextField, type TextFieldProps } from 'react-aria-components'

import { Label } from '@/components/label'
import { Text } from '@/components/text'
import { classNames } from '@/helpers/styles'

import './base-text-field.styles.sass'

type FilteredTextFieldProps = Omit<TextFieldProps, 'className'>

export type BaseTextFieldProps = FilteredTextFieldProps & {
  className?: string
  description?: React.ReactNode
  label?: React.ReactNode
  placeholder?: string
}

export const BaseTextField: React.FC<BaseTextFieldProps> = ({
  children,
  className,
  description,
  label,
  ...props
}) => (
  <TextField
    {...props}
    className={classNames('base-text-field', className)}
  >
    <Label>{label}</Label>

    <>{children}</>

    <Text
      className='base-text-field__description'
      slot='description'
    >
      {description}
    </Text>
  </TextField>
)
