import React from 'react'
import { TextField, type TextFieldProps } from 'react-aria-components'

import { Label } from '@/components/label'
import { Text } from '@/components/text'
import { classNames } from '@/helpers/styles'

import './base-text-field.styles.sass'

type FilteredTextFieldProps = Omit<TextFieldProps, 'className'>

export type BaseTextFieldProps = FilteredTextFieldProps & {
  /** Additional class names to apply to the motion component. */
  className?: string

  /** Description to display below the input. */
  description?: React.ReactNode

  /** Label to display above the input. */
  label?: React.ReactNode

  /** Placeholder text to display in the input. */
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
