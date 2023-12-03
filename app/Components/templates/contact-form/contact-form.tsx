'use client'

import { useForm, ValidationError } from '@formspree/react'

import { Textarea } from '@root/app/Components/base/ui/textarea'
import { Label } from '@root/app/Components/base/ui/label'

import { Button, Input } from '@/Components'
import { useLocale } from '@/Hooks'

import styles from './contact-form.styles.module.sass'
import { Send } from 'lucide-react'

type ContactFormProps = {
  formSpreeId: string
}

const ContactForm: React.FC<ContactFormProps> = ({ formSpreeId }) => {
  const [state, handleSubmit] = useForm(formSpreeId)
  const { dictionary } = useLocale()
  const strings = dictionary.pages.contact

  if (state.errors) {
    return (
      <div className={styles['contact-form']}>
        {strings.form.error}
      </div>
    )
  }

  if (state.succeeded) {
    return (
      <div className={styles['contact-form']}>
        {strings.form.success}
      </div>
    )
  }

  return (
    <form
      className={styles['contact-form']}
      onSubmit={handleSubmit}
    >
      <Input
        id='email'
        type='email'
        name='email'
      />

      <ValidationError 
        prefix='Email'
        field='email'
        errors={state.errors}
      />

      <Textarea id='message' name='message' />

      <ValidationError 
        prefix='Message'
        field='message'
        errors={state.errors}
      />

      <Button
        type='submit'
        disabled={state.submitting}
        className={styles['contact-form__submit-button']}
      >
        <Send size='1.2em' /> {strings.form.submit}
      </Button>
    </form>
  )
}

export default ContactForm
