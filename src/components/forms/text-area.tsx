import React from 'react'
import { TextArea as ReactAriaTextArea } from 'react-aria-components'

import { BaseTextField, type BaseTextFieldProps } from '@/components/forms/base-text-field'

import './text-area.styles.sass'

type TextAreaProps = BaseTextFieldProps & {
  placeholder?: string
}

export const TextArea: React.FC<TextAreaProps> = ({ placeholder, ...props }) => (
  <BaseTextField {...props}>
    <ReactAriaTextArea
      className='text-area'
      placeholder={placeholder}
    />
  </BaseTextField>
)
