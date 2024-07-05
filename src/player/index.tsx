'use client'

import React from 'react'

import { useProvidedContext } from '@/helpers/contexts'
import { isValidString } from '@/helpers/strings'
import { getStoredItem, storeItem } from '@/helpers/local-storage'
import { Player } from '@/player/components/player'

const DEFAULT_PLAYER_VOLUME = 50
const PLAYER_MIN_VOLUME = 0
const PLAYER_MAX_VOLUME = 100

type PlayerContextValue = {
  changeTrack: (trackId: string) => void
  changeVolume: (volume: number) => void
  pauseTrack: () => void
  playTrack: () => void
  stopTrack: () => void
  toggleMute: () => void
}

const PlayerContext = React.createContext<PlayerContextValue | null>(null)

export const PlayerProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isPlayerMuted, setIsPlayerMuted] = React.useState<boolean>(false)
  const [isPlaying, setIsPlaying] = React.useState<boolean>(true)
  const [playerVolume, setPlayerVolume] = React.useState<number>(DEFAULT_PLAYER_VOLUME)
  const [trackId, setTrackId] = React.useState<string | null>(null)

  const changeTrack = (trackId: string) => {
    setTrackId(trackId)
    setIsPlaying(true)
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

  const stopTrack = () => {
    setIsPlaying(false)
    setTrackId(null)
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
    pauseTrack,
    playTrack,
    stopTrack,
    toggleMute
  }

  return (
    <PlayerContext.Provider value={playerContextValue}>
      {children}

      {isValidString(trackId) && (
        <Player
          trackId={trackId}
          volume={playerVolume}
          muted={isPlayerMuted}
          playing={isPlaying}
        />
      )}
    </PlayerContext.Provider>
  )
}

export const usePlayer = () => useProvidedContext(PlayerContext, 'Player')
