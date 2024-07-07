import React from 'react'

import { Modal } from '@/components/modal'
import { useI18n } from '@/i18n/client'
import { TrackCard, type TrackCardProps } from '@/tracks/components/track-card'
import { TrackModal } from '@/tracks/components/track-modal'

export const TrackItem: React.FC<TrackCardProps> = ({ addTrackToPlaylist, track }) => {
  const { i18n } = useI18n()

  const TrackModalTrigger = <TrackCard addTrackToPlaylist={addTrackToPlaylist} track={track} />

  return (
    <Modal
      title={i18n('tracks.modal.title')}
      Trigger={TrackModalTrigger}
    >
      <TrackModal track={track} />
    </Modal>
  )
}
