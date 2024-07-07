'use client'

import React from 'react'

import { Image } from '@/components/image'
import { Pressable } from '@/components/pressable'
import type { TrackResult } from '@/tracks'

import './track-card.styles.sass'

type TrackCardProps = {
  addTrackToPlaylist: (track: TrackResult) => void
  track: TrackResult
}

export const TrackCard: React.FC<TrackCardProps> = ({ addTrackToPlaylist, track }) => {
  return (
    <Pressable className='track-card'>

      <div className='card-track__thumbnail'>
        {track.image !== null && (
          <Image
            alt={track.title}
            src={track.image}
          />
        )}
      </div>

      {track.title}
    </Pressable>
  )
}
