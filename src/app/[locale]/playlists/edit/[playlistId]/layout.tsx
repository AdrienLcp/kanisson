import type { Metadata } from 'next'
import React from 'react'

import { getBaseLocalizedMetadata, getLocalizedMetadataTitle } from '@/app/metadata'
import { getI18n } from '@/i18n'
import type { LayoutProps, PageParams } from '@/lib/next'
import { getPlaylistById } from '@/playlists/actions/get-playlist-by-id'

type EditPlaylistParams = {
  playlistId: string
}

export const generateMetadata = async ({ params }: PageParams<EditPlaylistParams>): Promise<Metadata> => {
  const locale = params.locale
  const playlistResponse = await getPlaylistById(params.playlistId)

  const i18n = getI18n(locale)
  const baseLocalizedMetadata = getBaseLocalizedMetadata(locale, i18n)

  if (playlistResponse.status === 'error') {
    return baseLocalizedMetadata
  }

  const editPlaylistPageTitle = `${playlistResponse.data.title} - ${i18n('metadata.page-titles.edit')}`

  const editPlaylistPageMetadataTitle = getLocalizedMetadataTitle(i18n, editPlaylistPageTitle)

  return {
    ...baseLocalizedMetadata,
    title: editPlaylistPageMetadataTitle,
    openGraph: { ...baseLocalizedMetadata.openGraph, title: editPlaylistPageMetadataTitle },
    twitter: { ...baseLocalizedMetadata.twitter, title: editPlaylistPageMetadataTitle }
  }
}

const EditPlaylistLayout: React.FC<LayoutProps> = ({ children }) => (<>{children}</>)
export default EditPlaylistLayout
