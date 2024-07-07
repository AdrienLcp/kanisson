'use client'

import React from 'react'
import ReactPlayer from 'react-player'
import type { BaseReactPlayerProps } from 'react-player/base'

import { isValidString } from '@/helpers/strings'
import { useI18n } from '@/i18n/client'

import './player.styles.sass'

type PlayerProps = BaseReactPlayerProps & {
  trackUrl?: string | null
}

export const Player: React.FC<PlayerProps> = ({ trackUrl, ...props }) => {
  const { i18n } = useI18n()

  if (!isValidString(trackUrl)) {
    return null
  }

  return (
    <ReactPlayer
      {...props}
      className='player'
      title={i18n('player.title')}
      url={trackUrl}
      youtube={{ playerVars: { autoplay: 1 } }}
    />
  )
}
