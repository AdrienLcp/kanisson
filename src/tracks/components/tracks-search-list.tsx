'use client'

import React from 'react'

import type { TrackResult } from '@/tracks'
import { TrackItem } from '@/tracks/components/track-item'

type TracksSearchListProps = {
  addTrackToPlaylist: (track: TrackResult) => void
  tracks: TrackResult[]
}

export const TracksSearchList: React.FC<TracksSearchListProps> = ({ addTrackToPlaylist, tracks }) => (
  <ul>
    {tracks.map(track => (
      <li key={track.id}>
        <TrackItem
          addTrackToPlaylist={addTrackToPlaylist}
          track={track}
        />
      </li>
    ))}
  </ul>
)
