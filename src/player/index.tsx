'use client'

import React from 'react'
import toast from 'react-hot-toast'
import ReactPlayer from 'react-player/lazy'

import { useProvidedContext } from '@/helpers/contexts'
import { getStoredItem, storeItem } from '@/helpers/local-storage'
import { isValidString } from '@/helpers/strings'
import { useI18n } from '@/i18n/client'

export const PLAYER_MIN_VOLUME = 0
export const PLAYER_MAX_VOLUME = 100
const DEFAULT_PLAYER_VOLUME = PLAYER_MAX_VOLUME / 2

import './player.styles.sass'

type PlayerContextValue = {
  changeVolume: (volume: number) => void
  hasPlayerError: boolean
  isPlayerLoading: boolean
  isPlayerMuted: boolean
  isPlaying: boolean
  pauseTrack: () => void
  playerVolume: number
  playTrack: (currentTrackUrl: string) => void
  stopPlayer: () => void
  toggleMute: () => void
  trackUrl: string | null
}

const PlayerContext = React.createContext<PlayerContextValue | null>(null)

export const PlayerProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [hasPlayerError, setHasPlayerError] = React.useState<boolean>(false)
  const [isPlayerLoading, setIsPlayerLoading] = React.useState<boolean>(false)
  const [isPlayerMuted, setIsPlayerMuted] = React.useState<boolean>(false)
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false)
  const [playerVolume, setPlayerVolume] = React.useState<number>(DEFAULT_PLAYER_VOLUME)
  const [shouldPlayerPlay, setShouldPlayerPlay] = React.useState<boolean>(false)
  const [trackUrl, setTrackUrl] = React.useState<string | null>(null)

  const { i18n } = useI18n()

  const changeTrack = (trackUrl: string) => {
    setIsPlayerLoading(true)
    setTrackUrl(trackUrl)
  }

  const changeVolume = (volume: number) => {
    const isVolumeValid
      = !isNaN(volume)
      && isFinite(volume)
      && volume >= PLAYER_MIN_VOLUME
      && volume <= PLAYER_MAX_VOLUME

    if (isVolumeValid) {
      setPlayerVolume(volume)
      storeItem('volume', volume)
    }
  }

  const pauseTrack = () => {
    setShouldPlayerPlay(false)
  }

  const playTrack = (currentTrackUrl: string) => {
    if (trackUrl !== currentTrackUrl) {
      changeTrack(currentTrackUrl)
    }
    setShouldPlayerPlay(true)
  }

  const stopPlayer = () => {
    setIsPlayerLoading(false)
    setIsPlaying(false)
    setShouldPlayerPlay(false)
    setTrackUrl(null)
  }

  const toggleMute = () => {
    setIsPlayerMuted(previousState => {
      storeItem('isMuted', !previousState)
      return !previousState
    })
  }

  const handlePlayerError = () => {
    toast.error(i18n('player.error'))
    setHasPlayerError(true)
  }

  React.useEffect(() => {
    const storedVolume = getStoredItem('volume')
    const storedMutedState = getStoredItem('isMuted')

    if (storedVolume !== undefined) {
      changeVolume(storedVolume)
    }

    if (storedMutedState !== undefined) {
      setIsPlayerMuted(Boolean(storedMutedState))
    }
  }, [])

  const playerContextValue: PlayerContextValue = {
    changeVolume,
    hasPlayerError,
    isPlayerLoading,
    isPlayerMuted,
    isPlaying,
    pauseTrack,
    playerVolume,
    playTrack,
    stopPlayer,
    toggleMute,
    trackUrl
  }

  return (
    <PlayerContext.Provider value={playerContextValue}>
      {children}

      {isValidString(trackUrl) && (
        <ReactPlayer
          className='player'
          muted={isPlayerMuted}
          onError={handlePlayerError}
          onPause={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
          onReady={() => setIsPlayerLoading(false)}
          playing={shouldPlayerPlay}
          title={i18n('player.title')}
          url={trackUrl ?? undefined}
          volume={playerVolume / PLAYER_MAX_VOLUME}
          config={{ youtube: { playerVars: { autoplay: 1 } } }}
        />
      )}
    </PlayerContext.Provider>
  )
}

export const usePlayer = () => useProvidedContext(PlayerContext, 'Player')
