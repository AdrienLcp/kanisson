'use client'

import React from 'react'

import { Image } from '@/components/image'
import { Pressable } from '@/components/pressable'
import type { TrackResult } from '@/tracks'

import './track-card.styles.sass'

const TRACK_CARD_IMAGE_SIZE = 32

export type TrackCardProps = {
  addTrackToPlaylist: (track: TrackResult) => void
  track: TrackResult
}

export const TrackCard: React.FC<TrackCardProps> = ({ addTrackToPlaylist, track }) => {

  console.log(addTrackToPlaylist)

  return (
    <Pressable className='track-card'>
      <div className='track-card__thumbnail'>
        <Image
          alt={track.title}
          height={TRACK_CARD_IMAGE_SIZE}
          src={track.image}
          width={TRACK_CARD_IMAGE_SIZE}
        />
      </div>

      {track.title}
    </Pressable>
  )
}
