import { ListMusicIcon, SearchIcon } from 'lucide-react'
import React from 'react'

import { Tabs, type Tab } from '@/components/tabs'
import { useI18n } from '@/i18n/client'
import type { TrackResult } from '@/tracks'
import { TracksList } from '@/tracks/components/tracks-list'
import { TracksSearch } from '@/tracks/components/tracks-search'

import './tracks.styles.sass'

type TrackTabKey = 'playlist-tracks' | 'tracks-search'

type TracksProps = {
  addTrackToPlaylist: (track: TrackResult) => void
}

export const Tracks: React.FC<TracksProps> = ({ addTrackToPlaylist }) => {
  const { i18n } = useI18n()

  const tracksTabs: Array<Tab<TrackTabKey>> = [
    {
      id: 'tracks-search',
      Content: <TracksSearch addTrackToPlaylist={addTrackToPlaylist} />,
      Icon: SearchIcon,
      title: i18n('tracks.search.title')
    },
    {
      id: 'playlist-tracks',
      Content: <TracksList />,
      Icon: ListMusicIcon,
      title: i18n('tracks.list.title')
    }
  ]

  return (
    <Tabs
      ariaLabel={i18n('tracks.tabs-aria-label')}
      defaultSelectedKey='tracks-search'
      tabs={tracksTabs}
    />
  )
}
