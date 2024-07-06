'use client'

import React from 'react'

import type { PageProps } from '@/lib/next'
// import { usePlayer } from '@/player'
import { getTracksBySearch, type SearchTracksRequest } from '@/tracks/actions/get-tracks-by-search'

const Home: React.FC<PageProps> = () => {
  // const { changeTrack } = usePlayer()

  // React.useEffect(() => {
  //   changeTrack('lTPh6NGLAmk')
  // }, [changeTrack])

  const searchTracks = async () => {
    try {
      const request: SearchTracksRequest = {
        search: 'Jean Jacques Goldman'
      }

      // const data = await getTracksBySearch(request)
      // console.log(data)
    } catch (error) {
      console.error(error)
    }
  }

  React.useEffect(() => {
    searchTracks()
  }, [])

  return (
    <div>
      home
    </div>
  )
}

export default Home
