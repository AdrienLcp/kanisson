import React from 'react'
import { FieldError } from 'react-aria-components'

import type { CommonFormFieldProps } from '@/forms'
import { Label } from '@/components/label'
import { Text } from '@/components/text'

import './base-field.styles.sass'

type FilteredBaseFieldProps = Omit<CommonFormFieldProps, 'placeholder'>

type BaseFieldProps = React.PropsWithChildren<FilteredBaseFieldProps>

export const BaseField: React.FC<BaseFieldProps> = ({ children, description, label }) => (
  <>
    <Label>{label}</Label>

    <>{children}</>

    <Text
      className='base-field__description'
      slot='description'
    >
      {description}
    </Text>

    <FieldError className='base-field__errors'>
      {(error) => error.validationErrors.map(errorMessage => (
        <span key={errorMessage}>
          {errorMessage}
        </span>
      ))}
    </FieldError>
  </>
)
