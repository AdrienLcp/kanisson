import React from 'react'
import { Form as ReactAriaForm, type FormProps as ReactAriaFormProps } from 'react-aria-components'

import { Button } from '@/components/button'
import { FormWrapper, type FormWrapperProps } from '@/forms/components/form-wrapper'
import { isValidString } from '@/helpers/strings'
import { classNames } from '@/helpers/styles'

import './form.styles.sass'

type FormProps = ReactAriaFormProps & FormWrapperProps & {
  /** Disable all children controls if true. */
  isDisabled?: boolean

  /** Disable submit button */
  isSubmitButtonDisabled?: boolean

  /** Displays a submit button if provided. */
  submitLabel?: string
}

export const Form: React.FC<FormProps> = ({
  children,
  className,
  errorMessage,
  isDisabled,
  isSubmitButtonDisabled,
  submitLabel,
  subtitle,
  title,
  ...props
}) => (
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

      {isValidString(submitLabel) && (
        <Button
          className='form__submit-button'
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
