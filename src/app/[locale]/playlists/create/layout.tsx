import type { Metadata } from 'next'
import type React from 'react'

import { getBaseLocalizedMetadata, getLocalizedMetadataTitle } from '@/app/metadata'
import { getI18n } from '@/i18n'
import type { LayoutProps, PageParams } from '@/lib/next'

export const generateMetadata = async ({ params }: PageParams): Promise<Metadata> => {
  const locale = params.locale
  const i18n = getI18n(locale)

  const baseLocalizedMetadata = getBaseLocalizedMetadata(locale, i18n)
  const createPlaylistPageMetadataTitle = getLocalizedMetadataTitle(i18n, i18n('metadata.page-titles.create'))

  return {
    ...baseLocalizedMetadata,
    title: createPlaylistPageMetadataTitle,
    openGraph: { ...baseLocalizedMetadata.openGraph, title: createPlaylistPageMetadataTitle },
    twitter: { ...baseLocalizedMetadata.twitter, title: createPlaylistPageMetadataTitle }
  }
}

const CreatePlaylistLayout: React.FC<LayoutProps> = ({ children }) => (<>{children}</>)
export default CreatePlaylistLayout
