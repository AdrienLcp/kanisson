'use server'

import type { Track } from '@prisma/client'
import { z } from 'zod'

import type { AuthenticationErrorCode } from '@/authentication'
import { getAuthenticatedUserWithPermissions } from '@/authentication/permissions'
import { env } from '@/env'
import { handleUnknownServerError } from '@/helpers/errors'
import { error, success, type Result } from '@/helpers/result'
import { getValidLocale, LocaleSchema, type Locale } from '@/i18n'
import type { YoutubeSearchResult } from '@/youtube'

export type SearchTracksRequest = {
  search: string
  locale?: Locale
  // pageToken?: string
}

type SearchTracksResponse = Result<Track[], AuthenticationErrorCode>

const BASE_URL = 'https://www.googleapis.com/youtube/v3/search'
const MAX_RESULT_COUNT = 3
const YOUTUBE_API_KEY = env.YOUTUBE_API_KEY

const TrackSearchSchema = z.object({
  search: z.string().min(1),
  locale: LocaleSchema.optional()
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

    const { search, locale } = requestValidation.data

    const currentLocale = getValidLocale(locale)

    const trackSearchParams = new URLSearchParams({
      part: 'snippet',
      q: search,
      key: YOUTUBE_API_KEY,
      maxResults: MAX_RESULT_COUNT.toString(),
      type: 'video',
      videoEmbeddable: 'true',
      relevanceLanguage: currentLocale,
      order: 'relevance',
      eventType: 'completed'
    })

    const youtubeResponse = await fetch(`${BASE_URL}?${trackSearchParams.toString()}`)
    const youtubeSearchResultItems: YoutubeSearchResult[] = await youtubeResponse.json()

    const tracks: Track[] = youtubeSearchResultItems.map((item) => ({
      title: item.snippet.title,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`
    }))

    return success(tracksData.items)
  } catch (error) {
    return handleUnknownServerError(error)
  }
}
