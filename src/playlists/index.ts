import type { ValueOf } from '@/helpers/objects'

export const PLAYLIST_RULES = {
  DESCRIPTION_MAX_LENGTH: 500,
  TITLE_MAX_LENGTH: 50,
  TITLE_MIN_LENGTH: 3
}

export const playlistErrors = {
  descriptionTooLong: 'description_too_long',
  titleTooLong: 'title_too_long',
  titleTooShort: 'title_too_short'
} as const

export type PlaylistErrorCode = ValueOf<typeof playlistErrors>

export const playlistFormFields = {
  title: 'title',
  description: 'description'
}