import React from 'react'

import { PageWrapper } from '@/app/components/page-wrapper'
import { ContactForm } from '@/app/[locale]/contact/contact-form'
import type { PageProps } from '@/lib/next-js'

const ContactPage: React.FC<PageProps> = () => (
  <PageWrapper titleRouteKey='contact'>
    <ContactForm />
  </PageWrapper>
)

export default ContactPage
