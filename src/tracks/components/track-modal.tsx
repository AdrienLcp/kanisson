'use client'

import { PauseIcon, PlayIcon, SquareIcon } from 'lucide-react'
import React from 'react'

import { Button } from '@/components/button'
// import { useI18n } from '@/i18n/client'
import { usePlayer } from '@/player'
import { PlayerVolume } from '@/player/components/player-volume'
import type { TrackResult } from '@/tracks'

import './track-modal.styles.sass'

type TrackModalProps = {
  track: TrackResult
}

export const TrackModal: React.FC<TrackModalProps> = ({ track }) => {
  // const { i18n } = useI18n()
  const { changeTrack, isPlaying, pauseTrack, playTrack, stopPlayer } = usePlayer()

  const handlePlayTrack = () => {
    changeTrack(track.url)
    playTrack()
  }

  const handlePauseTrack = () => {
    pauseTrack()
  }

  return (
    <div className='track-modal'>
      <div className='track-modal__player-controls'>
        <Button
          Icon={isPlaying ? PauseIcon : PlayIcon}
          onPress={isPlaying ? handlePauseTrack : handlePlayTrack}
          size='icon'
        />

        <Button
          Icon={SquareIcon}
          onPress={stopPlayer}
          size='icon'
        />
      </div>

      <PlayerVolume />
    </div>
  )
}
