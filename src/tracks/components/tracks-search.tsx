'use client'

import React from 'react'
import toast from 'react-hot-toast'

import { handleUnknownClientError } from '@/helpers/errors'
import { isValidString } from '@/helpers/strings'
import { useI18n } from '@/i18n/client'
import type { TrackResult } from '@/tracks'
import { getTracksBySearch, type SearchTracksRequest } from '@/tracks/actions/get-tracks-by-search'
import { TracksSearchForm } from '@/tracks/components/tracks-search-form'
import { TracksSearchList } from '@/tracks/components/tracks-search-list'

import './tracks-search.styles.sass'

export const trackSearchFormField = {
  search: 'search'
}

type TracksSearchProps = {
  addTrackToPlaylist: (track: TrackResult) => void
}

export const TracksSearch: React.FC<TracksSearchProps> = ({ addTrackToPlaylist }) => {
  const [isTracksSearchLoading, setIsTracksSearchLoading] = React.useState<boolean>(false)
  const [nextPageToken, setNextPageToken] = React.useState<string | undefined>(undefined)
  const [previousSearch, setPreviousSearch] = React.useState<string | null>(null)
  const [tracksResult, setTracksResult] = React.useState<TrackResult[]>([])

  const { currentLocale, i18n } = useI18n()

  const searchTracks = async (request: SearchTracksRequest) => {
    try {
      setIsTracksSearchLoading(true)

      const result = await getTracksBySearch(request)

      if (result.status === 'success') {
        setPreviousSearch(request.search)
        setNextPageToken(result.data.nextPageToken)
        setTracksResult(previousTracks => previousTracks.concat(result.data.tracks))
      }
    } catch (error) {
      handleUnknownClientError(error, i18n)
    } finally {
      setIsTracksSearchLoading(false)
    }
  }

  const loadTracks = (formData: FormData) => {
    const search = formData.get(trackSearchFormField.search)

    if (!isValidString(search)) {
      toast.error(i18n('tracks.search.search-required'))
      return
    }

    if (search === previousSearch) {
      return
    }

    const request: SearchTracksRequest = {
      locale: currentLocale,
      search
    }

    searchTracks(request)
  }

  const loadMoreTracks = () => {
    if (nextPageToken == null || previousSearch == null) {
      return
    }

    const request: SearchTracksRequest = {
      locale: currentLocale,
      pageToken: nextPageToken,
      search: previousSearch
    }

    searchTracks(request)
  }

  return (
    <TracksSearchForm
      hasResults={tracksResult.length > 0}
      isLoading={isTracksSearchLoading}
      loadMoreTracks={loadMoreTracks}
      loadTracks={loadTracks}
    >
      <TracksSearchList
        addTrackToPlaylist={addTrackToPlaylist}
        tracks={tracksResult}
      />
    </TracksSearchForm>
  )
}
