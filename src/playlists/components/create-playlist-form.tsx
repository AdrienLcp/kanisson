'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

import { getAuthenticationErrorMessage } from '@/authentication/client'
import type { ValidationErrors } from '@/forms'
import { Form } from '@/forms/components/form'
import { TextArea } from '@/forms/components/text-area'
import { TextField } from '@/forms/components/text-field'
import { getCommonErrorMessage } from '@/helpers/result'
import type { I18n } from '@/i18n'
import { useI18n } from '@/i18n/client'
import { PLAYLIST_RULES, playlistFormFields } from '@/playlists'
import { createPlaylist, type PlaylistCreationErrorCode } from '@/playlists/actions/create-playlist'
import { ROUTES } from '@/routes'

import './create-playlist-form.styles.sass'

type CreatePlaylistFormValidationErrors = ValidationErrors<keyof typeof playlistFormFields>

const getValidationErrors = (errors: PlaylistCreationErrorCode[], i18n: I18n): CreatePlaylistFormValidationErrors => {
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

export const CreatePlaylistForm: React.FC = () => {
  const [validationErrors, setValidationErrors] = React.useState<CreatePlaylistFormValidationErrors>(undefined)
  const [isFormSubmitting, setIsFormSubmitting] = React.useState<boolean>(false)

  const router = useRouter()

  const { i18n } = useI18n()

  const handleFormSubmit = async (formData: FormData) => {
    try {
      setIsFormSubmitting(true)
      const playlistCreationResponse = await createPlaylist(formData)

      if (playlistCreationResponse.status === 'error') {
        const errors = getValidationErrors(playlistCreationResponse.errors, i18n)
        setValidationErrors(errors)
        return
      }

      const createdPlaylist = playlistCreationResponse.data
      router.push(`${ROUTES.edit}/${createdPlaylist.title}`)
    } catch (error) {
      console.error(error)
    } finally {
      setIsFormSubmitting(false)
    }
  }

  React.useEffect(() => {
    if (validationErrors !== undefined && validationErrors.server.length > 0) {
      // Toaster notification
      console.error(validationErrors.server)
    }
  }, [validationErrors])

  return (
    <Form
      action={handleFormSubmit}
      isDisabled={isFormSubmitting}
      submitLabel={i18n('playlists.form.submit-label')}
      validationErrors={validationErrors}
    >
      <TextField
        hasError={validationErrors !== undefined && validationErrors.title.length > 0}
        isRequired
        label={i18n('playlists.form.fields.title.label')}
        name={playlistFormFields.title}
        placeholder={i18n('playlists.form.fields.title.placeholder')}
      />

      <TextArea
        hasError={validationErrors !== undefined && validationErrors.description.length > 0}
        label={i18n('playlists.form.fields.description.label')}
        name={playlistFormFields.description}
        placeholder={i18n('playlists.form.fields.description.placeholder')}
      />
    </Form>
  )
}
