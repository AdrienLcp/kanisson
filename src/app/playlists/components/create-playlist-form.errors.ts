import { PLAYLIST_RULES, type PlaylistFormField } from '@/app/playlists'
import type { PlaylistCreationErrorCode } from '@/app/playlists/actions/create-playlist'
import { getAuthenticationErrorMessage } from '@/authentication/client'
import type { ValidationErrors } from '@/forms/validation-errors'
import { getCommonErrorMessage } from '@/helpers/errors'
import type { I18n } from '@/i18n'

type CreatePlaylistFormValidationErrors = ValidationErrors<PlaylistFormField>

export const getPlaylistCreationValidationErrors = (errors: PlaylistCreationErrorCode[], i18n: I18n): CreatePlaylistFormValidationErrors => {
  const serverErrors: string[] = []
  const titleErrors: string[] = []
  const descriptionErrors: string[] = []

  errors.forEach(error => {
    switch (error) {
      case 'description_too_long':
        descriptionErrors.push(i18n('playlists.errors.description-too-long', { max: PLAYLIST_RULES.DESCRIPTION_MAX_LENGTH }))
        break
      case 'title_too_long':
        titleErrors.push(i18n('playlists.errors.title-too-long', { max: PLAYLIST_RULES.TITLE_MAX_LENGTH }))
        break
      case 'title_too_short':
        titleErrors.push(i18n('playlists.errors.title-too-short', { min: PLAYLIST_RULES.TITLE_MIN_LENGTH }))
        break
      case 'title_already_exists':
        titleErrors.push(i18n('playlists.errors.title-already-exists'))
        break
      case 'unauthenticated':
      case 'unauthorized':
      case 'user_not_found':
        serverErrors.push(getAuthenticationErrorMessage(error, i18n))
        break
      case 'bad_request':
      case 'internal_server_error':
        serverErrors.push(getCommonErrorMessage(error, i18n))
        break
    }
  })

  return {
    server: serverErrors,
    title: titleErrors,
    description: descriptionErrors
  }
}
