import type { Track } from '@prisma/client'

type TrackResultPickedFields
  = 'id'
  | 'image'
  | 'title'
  | 'url'

export type TrackResult = Pick<Track, TrackResultPickedFields>
