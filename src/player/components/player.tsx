'use client'

import React from 'react'
import ReactPlayer from 'react-player'
import type { BaseReactPlayerProps } from 'react-player/base'

import { isValidString } from '@/helpers/strings'
import { useI18n } from '@/i18n/client'

import './player.styles.sass'

type PlayerProps = BaseReactPlayerProps & {
  trackId?: string | null
}

export const Player: React.FC<PlayerProps> = ({ trackId, ...props }) => {
  const { i18n } = useI18n()

  if (!isValidString(trackId)) {
    return null
  }

  return (
    <ReactPlayer
      {...props}
      className='player'
      url={`https://www.youtube.com/watch?v=${trackId}`}
      title={i18n('player.title')}
      youtube={{ playerVars: { autoplay: 1 } }}
    />
  )
}
