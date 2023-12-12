'use client'

import type { TrackDTO } from '@/Types'

type EditTrackProps = {
  track: TrackDTO
  addTrackToPlaylist: (track: TrackDTO) => void
}

const EditTrack: React.FC<EditTrackProps> = ({ track, addTrackToPlaylist }) => {
  return (
    <div>
      
    </div>
  )
}

export default EditTrack
