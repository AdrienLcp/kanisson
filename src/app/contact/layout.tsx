import type { Metadata } from 'next'
import React from 'react'

import { getCommonMetadata, getMetadataTitle } from '@/app/metadata'
import type { LayoutProps } from '@/lib/next-js'

const commonMetadata = getCommonMetadata()
const contactPageTitle = getMetadataTitle('Contacte nous')

export const metadata: Metadata = {
  ...commonMetadata,
  title: contactPageTitle,
  openGraph: { ...commonMetadata.openGraph, title: contactPageTitle },
  twitter: { ...commonMetadata.twitter, title: contactPageTitle }
}

const ContactLayout: React.FC<LayoutProps> = ({ children }) => (<>{children}</>)
export default ContactLayout
