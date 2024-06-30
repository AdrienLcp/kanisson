import React from 'react'

import { ContactForm } from '@/app/[locale]/contact/contact-form'
import { PageWrapper } from '@/app/components/page-wrapper'
import { getI18n } from '@/i18n/server'
import type { PageProps } from '@/lib/next-js'

const ContactPage: React.FC<PageProps> = async ({ params }) => {
  const locale = params.locale
  const i18n = await getI18n(locale)

  return (
    <PageWrapper title={i18n('routes.contact.page-title')}>
      <ContactForm />
    </PageWrapper>
  )
}

export default ContactPage
