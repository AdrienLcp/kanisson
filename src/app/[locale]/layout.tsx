import type { Metadata } from 'next'
import React from 'react'

import { getBaseLocalizedMetadata, getLocalizedMetadataTitle } from '@/app/metadata'
import { getI18n } from '@/i18n'
import type { LayoutProps, PageParams } from '@/lib/next'

export const generateMetadata = async ({ params }: PageParams): Promise<Metadata> => {
  const locale = params.locale
  const i18n = getI18n(locale)

  const baseLocalizedMetadata = getBaseLocalizedMetadata(locale, i18n)
  const contactPageMetadataTitle = getLocalizedMetadataTitle(i18n, i18n('metadata.name'))

  return {
    ...baseLocalizedMetadata,
    title: contactPageMetadataTitle,
    openGraph: { ...baseLocalizedMetadata.openGraph, title: contactPageMetadataTitle },
    twitter: { ...baseLocalizedMetadata.twitter, title: contactPageMetadataTitle }
  }
}

const HomeLayout: React.FC<LayoutProps> = ({ children }) => (<>{children}</>)
export default HomeLayout
