import type { Metadata } from 'next'
import React from 'react'

import { getCommonLocalizedMetadata, getLocalizedMetadataTitle } from '@/app/metadata'
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
  const commonLocalizedMetadata = getCommonLocalizedMetadata(locale, i18n)

  if (playlistResponse.status === 'error') {
    return commonLocalizedMetadata
  }

  const editPlaylistPageTitle = `${playlistResponse.data.title} - ${i18n('metadata.page-titles.edit')}`

  const editPlaylistPageMetadataTitle = getLocalizedMetadataTitle(i18n, editPlaylistPageTitle)

  return {
    ...commonLocalizedMetadata,
    title: editPlaylistPageMetadataTitle,
    openGraph: { ...commonLocalizedMetadata.openGraph, title: editPlaylistPageMetadataTitle },
    twitter: { ...commonLocalizedMetadata.twitter, title: editPlaylistPageMetadataTitle }
  }
}

const EditPlaylistLayout: React.FC<LayoutProps> = ({ children }) => (<>{children}</>)
export default EditPlaylistLayout
