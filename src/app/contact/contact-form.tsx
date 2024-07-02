'use client'

import { useForm } from '@formspree/react'
import { SendIcon } from 'lucide-react'
import React from 'react'

import { Button } from '@/components/button'
import { Form } from '@/forms/components/form'
import { TextArea } from '@/forms/components/text-area'
import { TextField } from '@/forms/components/text-field'
import { StatusMessageBar } from '@/components/status-message'
import { env } from '@/env'
import type { ValueOf } from '@/helpers/objects'
import { isValidString } from '@/helpers/strings'
import { useI18n } from '@/i18n'

import './contact-form.styles.sass'

type ContactFormFields = {
  name: string | null
  message: string
}

const CONTACT_FORM_KEYS = {
  name: 'name',
  message: 'message'
}

type ContactFormKey = ValueOf<typeof CONTACT_FORM_KEYS>

const getContactFormValues = (formData: FormData) => {
  const getFormValue = (key: ContactFormKey) => {
    return formData.get(key)
  }

  const name = getFormValue('name')
  const message = getFormValue('message')

  if (!isValidString(message)) {
    return null
  }

  const values: ContactFormFields = {
    name: name?.toString() ?? null,
    message
  }

  return values
}

const FORM_SPREE_KEY = env.NEXT_PUBLIC_FORM_SPREE_KEY

export const ContactForm: React.FC = () => {
  const [state, handleSubmit] = useForm<ContactFormFields>(FORM_SPREE_KEY)
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)

  const { i18n } = useI18n()

  if (state.succeeded) {
    return (
      <StatusMessageBar
        status={{
          message: i18n('routes.contact.form.success-message'),
          type: 'success'
        }}
      />
    )
  }

  const handleContactFormSubmit = (formData: FormData) => {
    const values = getContactFormValues(formData)

    if (values === null) {
      setErrorMessage(i18n('routes.contact.error-messages.message'))
      return
    }

    handleSubmit(values)
  }

  return (
    <Form
      action={handleContactFormSubmit}
      className='contact-form'
      errorMessage={errorMessage}
      isDisabled={state.submitting}
    >
      <div className='contact-form__fields'>
        <TextField
          label={i18n('routes.contact.form.fields.name.label')}
          name={CONTACT_FORM_KEYS.name}
          placeholder={i18n('routes.contact.form.fields.name.placeholder')}
        />

        <TextArea
          label={i18n('routes.contact.form.fields.message.label')}
          isRequired
          name={CONTACT_FORM_KEYS.message}
          placeholder={i18n('routes.contact.form.fields.message.placeholder')}
        />
      </div>

      <Button
        className='contact-form__submit-button'
        Icon={SendIcon}
        type='submit'
        variant='primary'
      >
        {i18n('routes.contact.form.submit-button')}
      </Button>
    </Form>
  )
}
