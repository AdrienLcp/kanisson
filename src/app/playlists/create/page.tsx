import React from 'react'

import { PageWrapper } from '@/app/components/page-wrapper'
import { CreatePlaylistForm } from '@/app/playlists/components/create-playlist-form'

const CreatePlaylistPage: React.FC = () => (
  <PageWrapper titleRouteKey='create'>
    <CreatePlaylistForm />
  </PageWrapper>
)

export default CreatePlaylistPage
