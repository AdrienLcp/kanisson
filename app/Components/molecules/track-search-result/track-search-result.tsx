'use client'

import { useState } from 'react'

import type { TrackDTO, TrackResult, YoutubeVideoDetails } from '@/Types'
import { Dialog, DialogContent, DialogTrigger } from '@/Components/base/ui/dialog'
import { EditTrack, Loader, Tooltip } from '@/Components'
import { getConvertedVideoDuration, getYoutubeDetailsByIdUrl } from '@/Helpers'
import { useLocale, useToast } from '@/Hooks'

import styles from './track-search-result.styles.module.sass'
import { getTrackById } from '@root/app/Actions'

type TrackSearchResultProps = {
  track: TrackResult
  youtubeApiKey: string
  addTrackToPlaylist: (track: TrackDTO) => void
}

const TrackSearchResult: React.FC<TrackSearchResultProps> = ({ track, youtubeApiKey, addTrackToPlaylist }) => {
  const [selectedTrack, setSelectedTrack] = useState<TrackDTO | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { toast } = useToast()
  const { dictionary } = useLocale()
  const strings = dictionary.components.tracksSearchResult

  const handleTrackClick = async (track: TrackResult) => {
    try {
      setIsLoading(true)

      // const url = getYoutubeDetailsByIdUrl(track.id, youtubeApiKey)
      // const response = await fetch(url)
      // const result: TrackDTO = await response.json()

      // console.log(result)

      const test = await getTrackById({ videoId: track.id })
      console.log(test)

      // const duration = getConvertedVideoDuration(result.contentDetails.duration)

      // setSelectedTrack({
      //   durat
      // })

    } catch (error) {
      console.error(error)
      toast({
        variant: 'destructive',
        title: dictionary.api.type.error,
        description: strings.youtubeError
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    // <Dialog>
    //   <Tooltip content={strings.cardTooltip}>
    //     <DialogTrigger asChild>
          <button
            className={styles['card']}
            onClick={() => handleTrackClick(track)}
          >
            {track.title}
          </button>
      //   </DialogTrigger>
      // </Tooltip>

    //   <DialogContent>
    //     {isLoading && <Loader />}

    //     {!isLoading && selectedTrack && (
    //       <EditTrack
    //         track={selectedTrack}
    //         addTrackToPlaylist={addTrackToPlaylist}
    //       />
    //     )}
    //   </DialogContent>
    // </Dialog>
  )
}

export default TrackSearchResult
