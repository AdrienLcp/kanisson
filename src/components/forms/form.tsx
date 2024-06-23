import React from 'react'
import { Form as ReactAriaForm, type FormProps as ReactAriaFormProps } from 'react-aria-components'

import { Button } from '@/components/button'
import { isValidString } from '@/helpers/strings'
import { StatusMessageBar } from '@/components/status-message'

type FormProps = ReactAriaFormProps & {
  /** Displays a red message on top of the form if provided. */
  errorMessage?: string | null

  /** Disable all children controls if true. */
  isDisabled?: boolean

  /** Displays a submit button if provided. */
  submitLabel?: string

  /** Optional subtitle to display above the title. */
  subtitle?: string

  /** Optional title to display above the form. */
  title?: string
}

export const Form: React.FC<FormProps> = ({
  children,
  className,
  errorMessage,
  isDisabled,
  submitLabel,
  subtitle,
  title,
  ...props
}) => (
  <section className='form'>
    <header className='form__heading'>
      {isValidString(title) && (
        <h3 className='form__heading__title'>
          {title}
        </h3>
      )}

      {isValidString(subtitle) && (
        <p className='form__heading__title'>
          {subtitle}
        </p>
      )}
    </header>

    {isValidString(errorMessage) && (
      <StatusMessageBar
        status={{
          message: errorMessage,
          type: 'error'
        }}
      />
    )}

    <ReactAriaForm
      {...props}
      className='form__content'
    >
      <fieldset
        className={className}
        disabled={isDisabled}
      >
        {children}
      </fieldset>

      {isValidString(submitLabel) && (
        <Button type='submit'>
          {submitLabel}
        </Button>
      )}
    </ReactAriaForm>
  </section>
)
