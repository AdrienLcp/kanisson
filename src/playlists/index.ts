import { z } from 'zod'

import type { ValueOf } from '@/helpers/types'

export const PLAYLIST_RULES = {
  DESCRIPTION_MAX_LENGTH: 500,
  TITLE_MAX_LENGTH: 50,
  TITLE_MIN_LENGTH: 3
}

const playlistErrors = {
  descriptionTooLong: 'description_too_long',
  titleTooLong: 'title_too_long',
  titleTooShort: 'title_too_short'
} as const

type PlaylistError = typeof playlistErrors
export type PlaylistErrorCode = ValueOf<PlaylistError>

const PLAYLIST_ERRORS_CODES: PlaylistErrorCode[] = Object.values(playlistErrors)

export const isPlaylistErrorCode = (value: unknown): value is PlaylistErrorCode => {
  return PLAYLIST_ERRORS_CODES.includes(value as PlaylistErrorCode)
}

export const PlaylistCreationSchema = z.object({
  title: z
    .string()
    .min(PLAYLIST_RULES.TITLE_MIN_LENGTH, { message: playlistErrors.titleTooShort })
    .max(PLAYLIST_RULES.TITLE_MAX_LENGTH, { message: playlistErrors.titleTooLong }),
  description: z
    .string()
    .max(PLAYLIST_RULES.DESCRIPTION_MAX_LENGTH, { message: playlistErrors.descriptionTooLong })
    .optional()
})
