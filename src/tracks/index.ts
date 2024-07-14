import { v4 as generateID } from 'uuid'

import type { DataSource } from '@/datasources'
import { isValidString } from '@/helpers/strings'
import type { Track as PrismaTrack } from '@prisma/client'

export const TRACK_RULES = {
  MAX_TRACK_DURATION_IN_SECONDS: 60,
  MIN_TRACK_DURATION_IN_SECONDS: 5
}

export const getTrackWithoutDataSource = () => ({
  artist: null,
  duration: 30,
  id: generateID(),
  start: 10,
  title: null
})

type TrackResultOmittedField = 'playlistId' | 'source'

type BaseTrack = Omit<PrismaTrack, TrackResultOmittedField>

// Override source type to be DataSource (initially simple string with Prisma)
export type TrackResult = BaseTrack & {
  source: DataSource
}

export type Track = TrackResult & {
  playlistId: PrismaTrack['playlistId']
}

// Artist & title in valid track cannot be null
export type ValidTrack = Omit<Track, 'artist' | 'title'> & {
  artist: string
  title: string
}

export const isValidTrack = (track: Track) => {
  return isValidString(track.artist)
    && isValidString(track.title)
    && isValidString(track.url)
    && track.duration >= TRACK_RULES.MIN_TRACK_DURATION_IN_SECONDS
    && track.duration <= TRACK_RULES.MAX_TRACK_DURATION_IN_SECONDS
}
