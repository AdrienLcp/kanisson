import React from 'react'
import { TextArea as ReactAriaTextArea } from 'react-aria-components'

import { BaseTextField, type BaseTextFieldProps } from '@/forms/components/base-text-field'
import { classNames } from '@/helpers/styles'

import './text-area.styles.sass'

export const TextArea: React.FC<BaseTextFieldProps> = ({ hasError, isRequired, placeholder, ...props }) => (
  <BaseTextField {...props} isRequired={isRequired}>
    <ReactAriaTextArea
      className={classNames('text-area', hasError && 'invalid')}
      placeholder={placeholder}
    />
  </BaseTextField>
)
