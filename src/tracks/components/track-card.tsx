'use client'

import { ImageIcon } from 'lucide-react'
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
  const [hasImageError, setHasImageError] = React.useState<boolean>(true)

  const renderImage = (url: string | null) => {
    if (url === null || hasImageError) {
      return <ImageIcon />
    }

    return (
      <Image
        alt={track.title}
        src={url}
        width={32}
        height={32}
        onError={() => setHasImageError(true)}
      />
    )
  }

  console.log(addTrackToPlaylist)

  return (
    <>
      <Pressable className='track-card'>

        <div className='track-card__thumbnail'>
          {renderImage(track.image)}
        </div>

        {track.title}
      </Pressable>

      {/* //! modal */}
    </>
  )
}
