'use client'

import { useState } from 'react'

import type { TrackResult } from '@/Types'
import { TrackSearchInput } from '@/Components'

type TracksSearchProps = {
  youtubeApiKey: string
}

const TracksSearch: React.FC<TracksSearchProps> = ({ youtubeApiKey }) => {
  const [trackResults, setTracksResults] = useState<TrackResult[]>([])

  const onSubmitTrackSearch = (value: string) => {

  }

  return (
    <>
      <TrackSearchInput onSubmitTrackSearch={onSubmitTrackSearch} />

      <ul>
        {trackResults.map((track) => (
          <li key={track.id}>
            
          </li>
        ))}
      </ul>
    </>
  )
}

export default TracksSearch
