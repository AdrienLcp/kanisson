const YOUTUBE_API_MAX_RESULTS = 20

export const getYoutubeSearchUrl = (value: string, apiKey: string) => {
  return `https://www.googleapis.com/youtube/v3/search?type=video&part=snippet&q=${value}&key=${apiKey}&maxResults=${YOUTUBE_API_MAX_RESULTS}`
}

export const getYoutubeSearchNextPageUrl = (value: string, apiKey: string, pageToken: string) => {
  return `https://www.googleapis.com/youtube/v3/search?type=video&part=snippet&q=${value}&key=${apiKey}&maxResults=${YOUTUBE_API_MAX_RESULTS}&pageToken=${pageToken}`
}

export const getYoutubeDetailsByIdUrl = (id: string, apiKey: string) => {
  return `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${id}&key=${apiKey}`
}

export const getConvertedVideoDuration = (duration: string) => {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/)

  if (match) {
    const hours = (match[1] ? parseInt(match[1], 10) : 0) * 3600
    const minutes = (match[2] ? parseInt(match[2], 10) : 0) * 60
    const seconds = match[3] ? parseInt(match[3], 10) : 0

    return hours + minutes + seconds
  }

  return 0
}
