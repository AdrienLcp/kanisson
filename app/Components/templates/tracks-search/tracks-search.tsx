'use client'

import { useRef, useState } from 'react'
import { Plus } from 'lucide-react'

import type { TrackDTO, TrackResult, YoutubeItem, YoutubeResult } from '@/Types'
import { Button, Loader, TrackSearchInput, TracksSearchList } from '@/Components'
import { getYoutubeSearchNextPageUrl, getYoutubeSearchUrl } from '@/Helpers'
import { useLocale, useToast } from '@/Hooks'

import styles from './tracks-search.styles.module.sass'

type TracksSearchProps = {
  youtubeApiKey: string
  addTrackToPlaylist: (track: TrackDTO) => void
}

const TracksSearch: React.FC<TracksSearchProps> = ({ youtubeApiKey, addTrackToPlaylist }) => {
  const [tracks, setTracks] = useState<TrackResult[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const previousSearchValueRef = useRef<string>('')
  const nextPageTokenRef = useRef<string>('')

  const { dictionary } = useLocale()
  const { toast } = useToast()

  const strings = dictionary.components.tracksSearch

  const getDataFromYoutube = async (url: string) => {
    try {
      setIsLoading(true)

      const response = await fetch(url)
      const result: YoutubeResult  = await response.json()
      const newTracks: TrackResult[] = result.items.map((item: YoutubeItem) => ({
        id: item.id.videoId,
        title: item.snippet.title
      }))

      setTracks(prev => [...prev, ...newTracks])
    } catch (error) {
      console.error(error)
      toast({
        variant: 'destructive',
        title: dictionary.api.type.error,
        description: strings.youtubeError,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmitTrackSearch = (value: string) => {
    if (value.trim() === previousSearchValueRef.current.trim()) {
      return
    }

    previousSearchValueRef.current = value

    const url = getYoutubeSearchUrl(value, youtubeApiKey)
    getDataFromYoutube(url)
  }

  const getMoreDataFromYoutube = () => {
    const searchValue = previousSearchValueRef.current
    const token = nextPageTokenRef.current

    const url = getYoutubeSearchNextPageUrl(searchValue, token, youtubeApiKey)
    getDataFromYoutube(url)
  }

  return (
    <div className={styles['tracks-search']}>
      <TrackSearchInput onSubmitTrackSearch={onSubmitTrackSearch} />

      <TracksSearchList
        tracks={tracks}
        youtubeApiKey={youtubeApiKey}
        addTrackToPlaylist={addTrackToPlaylist}
      />

      {isLoading && <Loader />}
      
      {tracks.length > 0 && (
        <Button
          type='button'
          variant='outline'
          onClick={getMoreDataFromYoutube}
          className={styles['tracks-search__load-more-button']}
        >
          <Plus />
          {strings.loadMore}
        </Button>        
      )}
    </div>
  )
}

export default TracksSearch
