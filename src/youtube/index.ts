type YoutubeThumbnail = {
  height: number
  url: string
  width: number
}

export type YoutubeSearchResult = {
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
