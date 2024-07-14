'use client'

import React from 'react'

import { PlayerControls } from '@/player/components/player-controls'
import type { TrackResult } from '@/tracks'
import { TrackForm } from '@/tracks/components/track-form'

import './track-modal.styles.sass'

type TrackModalProps = {
  track: TrackResult
}

export const TrackModal: React.FC<TrackModalProps> = ({ track }) => (
  <div className='track-modal'>
    <TrackForm track={track} />

    <PlayerControls trackUrl={track.url} />
  </div>
)
