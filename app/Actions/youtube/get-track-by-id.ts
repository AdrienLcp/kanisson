'use server'

import type { ApiResponse, TrackDTO } from '@/Types'
import { getYoutubeDetailsByIdUrl } from '@/Helpers'

type GetTrackByIdRequest = {
  videoId: string
}

type GetTrackByIdResponse = ApiResponse<{
  track: TrackDTO
}>

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || ''

export const getTrackById = async (request: GetTrackByIdRequest): Promise<GetTrackByIdResponse> => {
  const { videoId } = request

  //! comment faire pour que ça se passe coté serveur bordel de merde
  
  const url = getYoutubeDetailsByIdUrl(videoId, YOUTUBE_API_KEY)
  const response = await fetch(url)
  const result = await response.json()

  console.log(result)

  const track: TrackDTO = {
    youtubeTitle: '',
    artist: '',
    image: '',
    start: 0,
    title: '',
    duration: 0,
    isValid: false
  }

  return { status: 'error', error: JSON.stringify(result) }
}
