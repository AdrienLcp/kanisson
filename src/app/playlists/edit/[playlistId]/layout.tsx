import type { Metadata } from 'next'
import React from 'react'

import { getCommonMetadata, getMetadataTitle } from '@/app/metadata'
import type { LayoutProps, PageParams } from '@/lib/next-js'
import { getPlaylistById } from '@/app/playlists/actions/get-playlist-by-id'

type EditPlaylistParams = {
  playlistId: string
}

const commonMetadata = getCommonMetadata()

export const generateMetadata = async ({ params }: PageParams<EditPlaylistParams>): Promise<Metadata> => {
  const playlistResponse = await getPlaylistById(params.playlistId)

  if (playlistResponse.status === 'error') {
    return commonMetadata
  }

  const editPlaylistPageTitle = getMetadataTitle(`${playlistResponse.data.title} - Modifie ta playlist`)

  return {
    ...commonMetadata,
    title: editPlaylistPageTitle,
    openGraph: { ...commonMetadata.openGraph, title: editPlaylistPageTitle },
    twitter: { ...commonMetadata.twitter, title: editPlaylistPageTitle }
  }
}

const EditPlaylistLayout: React.FC<LayoutProps> = ({ children }) => (<>{children}</>)
export default EditPlaylistLayout
