import React from 'react'

import { type StatusMessage, StatusMessageBar } from '@/components/status-message'
import { areValidChildren } from '@/lib/react'

import './form-wrapper.styles.sass'

export type FormWrapperProps = React.PropsWithChildren & {
  /** Displays a red message on top of the form if provided. */
  statusMessage?: StatusMessage | null

  /** Optional subtitle to display above the title. */
  subtitle?: React.ReactNode

  /** Optional title to display above the form. */
  title?: React.ReactNode
}

export const FormWrapper: React.FC<FormWrapperProps> = ({
  children,
  statusMessage,
  subtitle,
  title
}) => (
  <section className='form-wrapper'>
    {(areValidChildren(title) || areValidChildren(subtitle)) && (
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
    )}

    <StatusMessageBar status={statusMessage} />

    {children}
  </section>
)
