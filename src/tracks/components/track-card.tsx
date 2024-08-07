'use client'

import { PencilIcon } from 'lucide-react'
import React from 'react'

import { Image } from '@/components/image'
import { Pressable } from '@/components/pressable'
import { useI18n } from '@/i18n/client'
import type { TrackResult } from '@/tracks'

import './track-card.styles.sass'

const TRACK_CARD_IMAGE_SIZE = 32

export type TrackCardProps = {
  addTrackToPlaylist: (track: TrackResult) => void
  track: TrackResult
}

export const TrackCard: React.FC<TrackCardProps> = ({ track }) => {
  const { i18n } = useI18n()

  return (
    <Pressable className='track-card'>
      <div className='track-card__content'>
        <div className='track-card__content__thumbnail'>
          <Image
            alt={i18n('tracks.thumbnail-alt', { title: track.baseTitle })}
            height={TRACK_CARD_IMAGE_SIZE}
            src={track.image}
            width={TRACK_CARD_IMAGE_SIZE}
          />
        </div>

        <span className='track-card__content__title'>
          {track.baseTitle}
        </span>
      </div>

      <PencilIcon className='track-card__edit-icon' size='0.75rem' />
    </Pressable>
  )
}
