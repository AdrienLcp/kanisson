import type { Metadata } from 'next'
import React from 'react'

import { CreatePlaylistForm } from '@/playlists/components/create-playlist-form'
import { PageWrapper } from '@/app/components/page-wrapper'
import { getI18n } from '@/i18n/server'
import type { PageProps } from '@/lib/next-js'
import { getCommonMetadata, getMetadataTitle } from '@/app/metadata'

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const locale = params.locale
  const i18n = await getI18n(locale)

  const commonMetadata = await getCommonMetadata(i18n, locale)
  const title = getMetadataTitle(i18n, i18n('routes.playlists.create.metadata-title'))

  return {
    ...commonMetadata,
    title,
    openGraph: { ...commonMetadata.openGraph, title },
    twitter: { ...commonMetadata.twitter, title }
  }
}

const CreatePage: React.FC<PageProps> = async ({ params }) => {
  const locale = params.locale
  const i18n = await getI18n(locale)

  return (
    <PageWrapper title={i18n('routes.playlists.create.page-title')}>
      <CreatePlaylistForm />
    </PageWrapper>
  )
}

export default CreatePage
