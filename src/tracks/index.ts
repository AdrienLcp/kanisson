import type { Track } from '@prisma/client'

type BaseTrackPickedFields
  = 'title'
  | 'url'

export type BaseTrack = Pick<Track, BaseTrackPickedFields>
