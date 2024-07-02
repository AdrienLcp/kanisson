'use client'

import type { LucideIcon } from 'lucide-react'
import React from 'react'
import { Form as ReactAriaForm, type FormProps as ReactAriaFormProps } from 'react-aria-components'

import { Button } from '@/components/button'
import { FormWrapper, type FormWrapperProps } from '@/forms/components/form-wrapper'
import { isValidString } from '@/helpers/strings'
import { classNames } from '@/helpers/styles'
import { useI18n } from '@/i18n'

import './form.styles.sass'

type FormProps = ReactAriaFormProps & FormWrapperProps & {
  /** Disable all children controls if true. */
  isDisabled?: boolean

  /** Disable submit button if true */
  isSubmitButtonDisabled?: boolean

  /** Displays an Icon in submit button if submit label is provided. */
  SubmitIcon?: LucideIcon

  /** Displays a submit button if provided. */
  submitLabel?: string
}

export const Form: React.FC<FormProps> = ({
  children,
  className,
  errorMessage,
  isDisabled,
  isSubmitButtonDisabled,
  SubmitIcon,
  submitLabel,
  subtitle,
  title,
  ...props
}) => {
  const { i18n } = useI18n()

  return (
    <FormWrapper
      errorMessage={errorMessage}
      subtitle={subtitle}
      title={title}
    >
      <ReactAriaForm
        {...props}
        className='form'
      >
        <fieldset
          className={classNames('form__fields', className)}
          disabled={isDisabled}
        >
          {children}
        </fieldset>

        <span className='form__required-fields'>
          {i18n('forms.required-asterisk')}
        </span>

        {isValidString(submitLabel) && (
          <Button
            className='form__submit-button'
            Icon={SubmitIcon}
            isDisabled={isDisabled || isSubmitButtonDisabled}
            type='submit'
            variant='primary'
          >
            {submitLabel}
          </Button>
        )}
      </ReactAriaForm>
    </FormWrapper>
  )
}
