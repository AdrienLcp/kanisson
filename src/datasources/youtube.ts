import { getTrackWithoutDataSource, type TrackResult } from '@/tracks'

type YoutubeThumbnail = {
  height: number
  url: string
  width: number
}

type YoutubeSearchItem = {
  etag: string
  id: {
    kind: string
    videoId: string
  }
  kind: string
  snippet: {
    channelId: string
    channelTitle: string
    description: string
    liveBroadcastContent: string
    publishTime: string
    publishedAt: string
    thumbnails: {
      default: YoutubeThumbnail
      high: YoutubeThumbnail
      medium: YoutubeThumbnail
    }
    title: string
  }
}

type YoutubePageInfo = {
  totalResults: number
  resultsPerPage: number
}

export type YoutubeSearchResult = {
  etag: string
  items: YoutubeSearchItem[]
  kind: string
  nextPageToken: string
  pageInfo: YoutubePageInfo
  regionCode: string
}

export const getTrackFromYoutubeSearchResult = (item: YoutubeSearchItem): TrackResult => ({
  ...getTrackWithoutDataSource(),
  baseTitle: item.snippet.title,
  image: item.snippet.thumbnails.default.url,
  source: 'Youtube',
  url: `https://www.youtube.com/watch?v=${item.id.videoId}`
})
