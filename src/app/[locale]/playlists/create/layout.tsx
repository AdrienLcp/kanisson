import type { Metadata } from 'next'
import type React from 'react'

import { getCommonLocalizedMetadata, getLocalizedMetadataTitle } from '@/app/metadata'
import { getI18n } from '@/i18n/server'
import type { LayoutProps, PageParams } from '@/lib/next-js'

export const generateMetadata = async ({ params }: PageParams): Promise<Metadata> => {
  const locale = params.locale
  const i18n = await getI18n(locale)

  const commonLocalizedMetadata = getCommonLocalizedMetadata(locale, i18n)
  const createPlaylistPageMetadataTitle = getLocalizedMetadataTitle(i18n, i18n('metadata.page-titles.create'))

  return {
    ...commonLocalizedMetadata,
    title: createPlaylistPageMetadataTitle,
    openGraph: { ...commonLocalizedMetadata.openGraph, title: createPlaylistPageMetadataTitle },
    twitter: { ...commonLocalizedMetadata.twitter, title: createPlaylistPageMetadataTitle }
  }
}

const CreatePlaylistLayout: React.FC<LayoutProps> = ({ children }) => (<>{children}</>)
export default CreatePlaylistLayout
