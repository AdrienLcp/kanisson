import { PauseIcon, PlayIcon, SquareIcon } from 'lucide-react'
import React from 'react'

import { AnimatedAudioLines } from '@/assets/icons/animated-audio-lines'
import { Button } from '@/components/button'
import { usePlayer } from '@/player'
import { PlayerVolume } from '@/player/components/player-volume'

import './player-controls.styles.sass'

type PlayerControlsProps = {
  trackUrl: string
}

export const PlayerControls: React.FC<PlayerControlsProps> = ({ trackUrl }) => {
  const { isPlayerLoading, isPlaying, pauseTrack, playTrack, stopPlayer } = usePlayer()

  return (
    <div className='player-controls'>
      <Button
        Icon={isPlaying ? PauseIcon : PlayIcon}
        isLoading={isPlayerLoading}
        onPress={isPlaying ? pauseTrack : () => playTrack(trackUrl)}
        size='icon'
      />

      <AnimatedAudioLines isActive={isPlaying} />

      <Button
        Icon={SquareIcon}
        isDisabled={isPlayerLoading || !isPlaying}
        onPress={stopPlayer}
        size='icon'
      />

      <PlayerVolume />
    </div>
  )
}
