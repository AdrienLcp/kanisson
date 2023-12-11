import type { TrackResult } from '@/Types'
import { Tooltip } from '@/Components'

import styles from './track-search-result.styles.module.sass'

type TrackSearchResultProps = {
  track: TrackResult
  addToTrackList: (track: TrackResult) => void
}

const TrackSearchResult: React.FC<TrackSearchResultProps> = ({ track, addToTrackList }) => {


  return (
    <Tooltip>
      <button
        className={styles['card']}
        onClick={() => addToTrackList(track)}
      >

      </button>
    </Tooltip>
  )
}

export default TrackSearchResult
