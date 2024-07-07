'use client'

import React from 'react'

import { useProvidedContext } from '@/helpers/contexts'
import { getStoredItem, storeItem } from '@/helpers/local-storage'
import { isValidString } from '@/helpers/strings'
import { Player } from '@/player/components/player'

export const PLAYER_MIN_VOLUME = 0
export const PLAYER_MAX_VOLUME = 100
const DEFAULT_PLAYER_VOLUME = PLAYER_MAX_VOLUME / 2

type PlayerContextValue = {
  changeTrack: (trackId: string) => void
  changeVolume: (volume: number) => void
  isPlayerMuted: boolean
  isPlaying: boolean
  pauseTrack: () => void
  playerVolume: number
  playTrack: () => void
  stopPlayer: () => void
  toggleMute: () => void
  trackUrl: string | null
}

const PlayerContext = React.createContext<PlayerContextValue | null>(null)

export const PlayerProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isPlayerMuted, setIsPlayerMuted] = React.useState<boolean>(false)
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false)
  const [playerVolume, setPlayerVolume] = React.useState<number>(DEFAULT_PLAYER_VOLUME)
  const [trackUrl, setTrackUrl] = React.useState<string | null>(null)

  const changeTrack = (trackUrl: string) => {
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

  const playTrack = () => {
    setIsPlaying(true)
  }

  const pauseTrack = () => {
    setIsPlaying(false)
  }

  const stopPlayer = () => {
    setIsPlaying(false)
    setTrackUrl(null)
  }

  const toggleMute = () => {
    setIsPlayerMuted(previousState => {
      storeItem('isMuted', !previousState)
      return !previousState
    })
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
    changeTrack,
    changeVolume,
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
        <Player
          trackUrl={trackUrl}
          volume={playerVolume}
          muted={isPlayerMuted}
          playing={isPlaying}
        />
      )}
    </PlayerContext.Provider>
  )
}

export const usePlayer = () => useProvidedContext(PlayerContext, 'Player')
