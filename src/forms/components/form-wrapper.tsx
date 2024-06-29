import React from 'react'

import { StatusMessageBar } from '@/components/status-message'
import { isValidString } from '@/helpers/strings'
import { areValidChildren } from '@/helpers/ui'

import './form-wrapper.styles.sass'

export type FormWrapperProps = React.PropsWithChildren & {
  /** Displays a red message on top of the form if provided. */
  errorMessage?: string | null

  /** Optional subtitle to display above the title. */
  subtitle?: React.ReactNode

  /** Optional title to display above the form. */
  title?: React.ReactNode
}

export const FormWrapper: React.FC<FormWrapperProps> = ({
  children,
  errorMessage,
  subtitle,
  title
}) => {
  return (
    <section className='form-wrapper'>
      <header className='form-wrapper__heading'>
        {areValidChildren(title) && (
          <h3 className='form-wrapper__heading__title'>
            {title}
          </h3>
        )}

        {areValidChildren(subtitle) && (
          <p className='form-wrapper__heading__subtitle'>
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

      {children}
    </section>
  )
}
