import type { Metadata } from 'next'
import React from 'react'

import { getCommonLocalizedMetadata, getLocalizedMetadataTitle } from '@/app/metadata'
import { getI18n } from '@/i18n'
import type { PageParams } from '@/lib/next'

export const generateMetadata = async ({ params }: PageParams): Promise<Metadata> => {
  const locale = params.locale
  const i18n = getI18n(locale)

  const commonLocalizedMetadata = getCommonLocalizedMetadata(locale, i18n)
  const contactPageMetadataTitle = getLocalizedMetadataTitle(i18n, i18n('metadata.page-titles.contact'))

  return {
    ...commonLocalizedMetadata,
    title: contactPageMetadataTitle,
    openGraph: { ...commonLocalizedMetadata.openGraph, title: contactPageMetadataTitle },
    twitter: { ...commonLocalizedMetadata.twitter, title: contactPageMetadataTitle }
  }
}

const SettingsLayout: React.FC<React.PropsWithChildren> = ({ children }) => (<>{children}</>)
export default SettingsLayout
