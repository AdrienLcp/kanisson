'use server'

import { z } from 'zod'

import type { AuthenticationErrorCode } from '@/authentication'
import { getAuthenticatedUserWithPermissions } from '@/authentication/permissions'
import { getTrackFromYoutubeSearchResult, type YoutubeSearchResult } from '@/datasources/youtube'
import { env } from '@/env'
import { handleUnknownServerError } from '@/helpers/errors'
import { error, success, type Result } from '@/helpers/result'
import { LocaleSchema, type Locale } from '@/i18n'
import { isValidString } from '@/helpers/strings'
import type { TrackResult } from '@/tracks'

export type SearchTracksRequest = {
  search: string
  locale?: Locale
  pageToken?: string
}

type SearchTracksSuccessResponse = {
  tracks: TrackResult[]
  nextPageToken: string
}

type SearchTracksResponse = Result<SearchTracksSuccessResponse, AuthenticationErrorCode>

const BASE_URL = 'https://www.googleapis.com/youtube/v3/search'
const TRACK_SEARCH_MAX_RESULT_COUNT = 3
const YOUTUBE_API_KEY = env.YOUTUBE_API_KEY

const TrackSearchSchema = z.object({
  search: z.string().min(1),
  locale: LocaleSchema.optional(),
  pageToken: z.string().optional()
})

export const getTracksBySearch = async (request: SearchTracksRequest): Promise<SearchTracksResponse> => {
  try {
    const requestValidation = TrackSearchSchema.safeParse(request)

    if (requestValidation.error) {
      return error('bad_request')
    }

    const authenticationResponse = await getAuthenticatedUserWithPermissions('search_tracks')

    if (authenticationResponse.status === 'error') {
      return authenticationResponse
    }

    const trackSearchParams = new URLSearchParams({
      part: 'snippet',
      q: requestValidation.data.search,
      key: YOUTUBE_API_KEY,
      maxResults: TRACK_SEARCH_MAX_RESULT_COUNT.toString(),
      type: 'video',
      videoEmbeddable: 'true',
      order: 'relevance',
      eventType: 'completed'
    })

    if (isValidString(requestValidation.data.pageToken)) {
      trackSearchParams.set('pageToken', requestValidation.data.pageToken)
    }

    if (isValidString(requestValidation.data.locale)) {
      trackSearchParams.set('relevanceLanguage', requestValidation.data.locale)
    }

    const youtubeResponse = await fetch(`${BASE_URL}?${trackSearchParams.toString()}`)
    const youtubeSearchResult: YoutubeSearchResult = await youtubeResponse.json()
    const tracks: TrackResult[] = youtubeSearchResult.items.map((item) => getTrackFromYoutubeSearchResult(item))

    const tracksSearchResponse: SearchTracksSuccessResponse = {
      tracks,
      nextPageToken: youtubeSearchResult.nextPageToken
    }

    return success(tracksSearchResponse)
  } catch (error) {
    return handleUnknownServerError(error)
  }
}
