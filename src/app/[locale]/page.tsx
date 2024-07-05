'use client'

import React from 'react'

import type { PageProps } from '@/lib/next'
import { usePlayer } from '@/player'

const Home: React.FC<PageProps> = () => {

  const { changeTrack } = usePlayer()

  React.useEffect(() => {
    changeTrack('lTPh6NGLAmk')
  }, [changeTrack])

  return (
    <div>
      home
    </div>
  )
}

export default Home
