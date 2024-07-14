'use client'

import { Volume1Icon, Volume2Icon, VolumeIcon, VolumeXIcon } from 'lucide-react'
import React from 'react'

import { Button } from '@/components/button'
import { Slider } from '@/components/slider'
import { classNames } from '@/helpers/styles'
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

type PlayerVolumeProps = {
  isHorizontal?: boolean
}

export const PlayerVolume: React.FC<PlayerVolumeProps> = ({ isHorizontal = false }) => {
  const [isSliderVisible, setIsSliderVisible] = React.useState<boolean>(isHorizontal)

  const { i18n } = useI18n()
  const { changeVolume, isPlayerMuted, playerVolume, toggleMute } = usePlayer()

  const label = i18n('player.volume')

  return (
    <div
      className={classNames('player-volume', !isHorizontal && 'vertical')}
      onMouseLeave={() => setIsSliderVisible(false)}
    >
      <div className={classNames('player-volume__slider', !isSliderVisible && 'hidden')}>
        <Slider
          isDisabled={isPlayerMuted}
          label={label}
          maxValue={PLAYER_MAX_VOLUME}
          minValue={PLAYER_MIN_VOLUME}
          onChange={changeVolume}
          orientation={isHorizontal ? 'horizontal' : 'vertical'}
          step={1}
          value={playerVolume}
        />
      </div>

      <div
        className='player-volume__button'
        onMouseEnter={() => setIsSliderVisible(true)}
      >
        <Button
          Icon={getVolumeIcon(isPlayerMuted, playerVolume)}
          onPress={toggleMute}
          size='icon'
        />
      </div>
    </div>
  )
}
