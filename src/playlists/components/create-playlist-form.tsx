'use client'

import React from 'react'

import type { ValidationErrors } from '@/forms'
import { Form } from '@/forms/components/form'
import { TextArea } from '@/forms/components/text-area'
import { TextField } from '@/forms/components/text-field'
import { type Result, success, error } from '@/helpers/result'
import type { I18n } from '@/i18n'
import { useI18n } from '@/i18n/client'
import { PLAYLIST_RULES, PlaylistCreationSchema, isPlaylistErrorCode, type PlaylistErrorCode } from '@/playlists'
import { type CreatePlaylistRequest, createPlaylist } from '@/playlists/actions/create-playlist'

import './create-playlist-form.styles.sass'

const createPlaylistFormFields = {
  title: 'title',
  description: 'description'
}

type CreatePlaylistFormValidationErrors = ValidationErrors<keyof typeof createPlaylistFormFields>

type PlaylistCreationValidation = Result<CreatePlaylistRequest, PlaylistErrorCode>

const getPlaylistCreationRequest = (formData: FormData): PlaylistCreationValidation => {
  const createPlaylistForm = {
    title: formData.get(createPlaylistFormFields.title),
    description: formData.get(createPlaylistFormFields.description)
  }

  const playlistCreationValidation = PlaylistCreationSchema.safeParse(createPlaylistForm)

  if (playlistCreationValidation.success) {
    return success(playlistCreationValidation.data)
  }

  const zodErrorsList: PlaylistErrorCode[] = []

  playlistCreationValidation.error.errors.forEach(error => {
    if (isPlaylistErrorCode(error.message)) {
      zodErrorsList.push(error.message)
    }
  })

  return error(zodErrorsList)
}

const getValidationErrors = (errors: PlaylistErrorCode[], i18n: I18n): CreatePlaylistFormValidationErrors => {
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
    }
  })
}

export const CreatePlaylistForm: React.FC = () => {
  const [validationErrors, setValidationErrors] = React.useState<CreatePlaylistFormValidationErrors>(undefined)
  const [isFormSubmitting, setIsFormSubmitting] = React.useState<boolean>(false)

  const { i18n } = useI18n()

  const handleFormSubmit = async (formData: FormData) => {
    setIsFormSubmitting(true)

    const playlistCreationRequest = getPlaylistCreationRequest(formData)

    if (playlistCreationRequest.status === 'error') {
      const errors = getValidationErrors(playlistCreationRequest.errors, i18n)
    }

    if (playlistCreationRequest.status === 'success') {
      // const playlistCreationResponse = await createPlaylist(playlistCreationRequest.data)
    }

    setIsFormSubmitting(false)
  }

  React.useEffect(() => {
    const titleErrors: string[] = []
    const descriptionErrors: string[] = []

    descriptionErrors.push(i18n('playlists.errors.description-too-long', { max: PLAYLIST_RULES.DESCRIPTION_MAX_LENGTH }))
    titleErrors.push(i18n('playlists.errors.title-too-long', { max: PLAYLIST_RULES.TITLE_MAX_LENGTH }))
    titleErrors.push(i18n('playlists.errors.title-too-short', { min: PLAYLIST_RULES.TITLE_MIN_LENGTH }))

    setValidationErrors({
      title: titleErrors,
      description: descriptionErrors
    })
  }, [i18n])

  return (
    <Form
      action={handleFormSubmit}
      validationErrors={validationErrors}
      isDisabled={isFormSubmitting}
      submitLabel={i18n('playlists.form.submit-label')}
    >
      <TextField
        label={i18n('playlists.form.fields.title.label')}
        name={createPlaylistFormFields.title}
        placeholder={i18n('playlists.form.fields.title.placeholder')}
        isRequired
      />

      <TextArea
        label={i18n('playlists.form.fields.description.label')}
        name={createPlaylistFormFields.description}
        placeholder={i18n('playlists.form.fields.description.placeholder')}
      />
    </Form>
  )
}
