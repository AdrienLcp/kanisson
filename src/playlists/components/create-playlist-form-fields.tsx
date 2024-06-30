'use client'

import React from 'react'

import type { ValidationErrors } from '@/forms/validation-errors'
import { playlistFormFields, type PlaylistFormField } from '@/playlists'
import { TextArea } from '@/forms/components/text-area'
import { TextField } from '@/forms/components/text-field'
import { useI18n } from '@/i18n/client'

type CreatePlaylistFormFieldsProps = {
  validationErrors: ValidationErrors<PlaylistFormField>
}

export const CreatePlaylistFormFields: React.FC<CreatePlaylistFormFieldsProps> = ({ validationErrors }) => {
  const { i18n } = useI18n()

  return (
    <>
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
    </>
  )
}
