import type { Metadata } from 'next'
import React from 'react'

import { ContactForm } from '@/app/[locale]/contact/contact-form'
import { PageWrapper } from '@/app/components/page-wrapper'
import { getI18n } from '@/i18n/server'
import type { PageProps } from '@/lib/next-js'
import { getCommonMetadata, getMetadataTitle } from '@/app/metadata'

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const locale = params.locale
  const i18n = await getI18n(locale)

  const commonMetadata = await getCommonMetadata(i18n, locale)
  const title = getMetadataTitle(i18n, i18n('routes.contact.metadata-title'))

  return {
    ...commonMetadata,
    title,
    openGraph: { ...commonMetadata.openGraph, title },
    twitter: { ...commonMetadata.twitter, title }
  }
}

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
