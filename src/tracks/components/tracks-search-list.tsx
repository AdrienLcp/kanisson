'use client'

import React from 'react'

import type { TrackResult } from '@/tracks'
import { TrackCard } from '@/tracks/components/track-card'

import './tracks-search-list.styles.sass'

type TracksSearchListProps = {
  addTrackToPlaylist: (track: TrackResult) => void
  tracks: TrackResult[]
}

export const TracksSearchList: React.FC<TracksSearchListProps> = ({ addTrackToPlaylist, tracks }) => {
  return (
    <ul>
      {tracks.map(track => (
        <li key={track.id}>
          <TrackCard
            track={track}
            addTrackToPlaylist={addTrackToPlaylist}
          />
        </li>
      ))}
    </ul>
  )
}
