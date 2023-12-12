'use client'

import type { TrackDTO, TrackResult } from '@/Types'
import { TrackSearchResult } from '@/Components'

import styles from './tracks-search-list.styles.module.sass'

type TracksSearchListProps = {
  tracks: TrackResult[]
  youtubeApiKey: string
  addTrackToPlaylist: (track: TrackDTO) => void
}

const TracksSearchList: React.FC<TracksSearchListProps> = ({ tracks, youtubeApiKey, addTrackToPlaylist }) => (
  <ul className={styles['list']}>
    {tracks.map(track => (
      <li key={track.id} className={styles['list__item']}>
        <TrackSearchResult
          track={track}
          youtubeApiKey={youtubeApiKey}
          addTrackToPlaylist={addTrackToPlaylist}
        />
      </li>
    ))}
  </ul>
)

export default TracksSearchList
