export type YoutubeItem = {
  id: {
    videoId: string
  }
  snippet: {
    description: string
    publishTime: Date
    publishedAt: Date
    title: string
    thumbnails: {
      default: {
        height: number
        url: string
        width: number
      }
      high: {
        height: number
        url: string
        width: number
      }
      medium: {
        height: number
        url: string
        width: number
      }
    }
  }
}

export type YoutubeResult = {
  items: YoutubeItem[]
  nextPageToken: string
  pageInfo: {
    totalResults: number
    resultsPerPage: number
  }
}

export type YoutubeVideoDetails = {
  id: string
  contentDetails: {
    duration: string
  }
}

