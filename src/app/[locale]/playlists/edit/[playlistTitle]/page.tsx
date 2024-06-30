import type { Metadata } from 'next'
import React from 'react'

import { getCommonMetadata, getMetadataTitle } from '@/app/metadata'
import { getI18n } from '@/i18n/server'
import type { PageProps } from '@/lib/next-js'

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const locale = params.locale
  const i18n = await getI18n(locale)

  const commonMetadata = await getCommonMetadata(i18n, locale)
  const title = getMetadataTitle(i18n, i18n('routes.playlists.edit.metadata-title'))

  return {
    ...commonMetadata,
    title,
    openGraph: { ...commonMetadata.openGraph, title },
    twitter: { ...commonMetadata.twitter, title }
  }
}

type EditPlaylistPageParams = {
  playlistTitle: string
}

type EditPlaylistPageProps = PageProps<EditPlaylistPageParams>

const EditPlaylistPage: React.FC<EditPlaylistPageProps> = ({ params }) => {
  const title = params.playlistTitle

  return (
    <div className='page'>
      {title}
    </div>
  )
}

export default EditPlaylistPage
