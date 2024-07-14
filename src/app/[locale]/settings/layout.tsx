import type { Metadata } from 'next'
import React from 'react'

import { getBaseLocalizedMetadata, getLocalizedMetadataTitle } from '@/app/metadata'
import { getI18n } from '@/i18n'
import type { PageParams } from '@/lib/next'

export const generateMetadata = async ({ params }: PageParams): Promise<Metadata> => {
  const locale = params.locale
  const i18n = getI18n(locale)

  const baseLocalizedMetadata = getBaseLocalizedMetadata(locale, i18n)
  const settingsPageMetadataTitle = getLocalizedMetadataTitle(i18n, i18n('metadata.page-titles.settings'))

  return {
    ...baseLocalizedMetadata,
    title: settingsPageMetadataTitle,
    openGraph: { ...baseLocalizedMetadata.openGraph, title: settingsPageMetadataTitle },
    twitter: { ...baseLocalizedMetadata.twitter, title: settingsPageMetadataTitle }
  }
}

const SettingsLayout: React.FC<React.PropsWithChildren> = ({ children }) => (<>{children}</>)
export default SettingsLayout
