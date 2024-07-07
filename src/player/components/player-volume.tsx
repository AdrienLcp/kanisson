'use client'

import { Volume1Icon, Volume2Icon, VolumeIcon, VolumeXIcon } from 'lucide-react'
import React from 'react'

import { Button } from '@/components/button'
import { Slider } from '@/components/slider'
import { useI18n } from '@/i18n/client'
import { PLAYER_MAX_VOLUME, PLAYER_MIN_VOLUME, usePlayer } from '@/player'

import './player-volume.styles.sass'

const getVolumeIcon = (isMuted: boolean, volume: number) => {
  if (isMuted) {
    return VolumeXIcon
  }

  if (volume === 0) {
    return VolumeIcon
  }

  if (volume <= PLAYER_MAX_VOLUME / 2) {
    return Volume1Icon
  }

  return Volume2Icon
}

export const PlayerVolume: React.FC = () => {
  const { i18n } = useI18n()
  const { changeVolume, isPlayerMuted, playerVolume, toggleMute } = usePlayer()

  return (
    <div className='player-volume'>
      <Slider
        className='player-volume__slider'
        isDisabled={isPlayerMuted}
        label={i18n('player.volume')}
        maxValue={PLAYER_MAX_VOLUME}
        minValue={PLAYER_MIN_VOLUME}
        onChange={changeVolume}
        step={1}
        value={playerVolume}
      />

      <Button
        Icon={getVolumeIcon(isPlayerMuted, playerVolume)}
        onPress={toggleMute}
        size='icon'
      />
    </div>
  )
}
