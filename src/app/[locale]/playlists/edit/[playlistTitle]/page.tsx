import React from 'react'

import type { PageProps } from '@/lib/next-js'

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
