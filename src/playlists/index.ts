import type { ValueOf } from '@/helpers/objects'

export const PLAYLIST_RULES = {
  DESCRIPTION_MAX_LENGTH: 500,
  TITLE_MAX_LENGTH: 50,
  TITLE_MIN_LENGTH: 3
}

export const playlistZodErrors = {
  descriptionTooLong: 'description_too_long',
  titleTooLong: 'title_too_long',
  titleTooShort: 'title_too_short'
} as const

export type PlaylistErrorCode =
  ValueOf<typeof playlistZodErrors> |
  'playlist_does_not_belong_to_you' |
  'playlist_not_found' |
  'title_already_exists'

export const playlistFormFields = {
  title: 'title',
  description: 'description'
} as const

export type PlaylistFormField = ValueOf<typeof playlistFormFields>

const playlistZodErrorsCodes: string[] = Object.values(playlistZodErrors)

export const isPlaylistZodErrorCode = (errorCode: string): errorCode is PlaylistErrorCode => {
  return playlistZodErrorsCodes.includes(errorCode)
}

