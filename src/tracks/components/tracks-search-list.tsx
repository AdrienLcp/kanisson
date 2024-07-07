'use client'

import React from 'react'

import type { TrackResult } from '@/tracks'
import { TrackItem } from '@/tracks/components/track-item'

type TracksSearchListProps = {
  addTrackToPlaylist: (track: TrackResult) => void
  tracks: TrackResult[]
}

export const TracksSearchList: React.FC<TracksSearchListProps> = ({ addTrackToPlaylist, tracks }) => {
  return (
    <ul>
      {tracks.map(track => (
        <li key={track.id} style={{ width: '100%' }}>
          <TrackItem
            addTrackToPlaylist={addTrackToPlaylist}
            track={track}
          />
        </li>
      ))}
    </ul>
  )
}
