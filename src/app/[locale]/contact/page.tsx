import React from 'react'

import { PageWrapper } from '@/app/components/page-wrapper'
import type { PageProps } from '@/helpers/next-js'
import { getDictionary } from '@/i18n/server'
import { buildI18n } from '@/i18n'
import { ContactForm } from '@/app/[locale]/contact/contact-form'

const ContactPage: React.FC<PageProps> = async ({ params }) => {
  const locale = params.locale

  const dictionary = await getDictionary(locale)
  const i18n = buildI18n(dictionary, locale)

  return (
    <PageWrapper title={i18n('routes.contact.page-title')}>
      <ContactForm />
    </PageWrapper>
  )
}

export default ContactPage
