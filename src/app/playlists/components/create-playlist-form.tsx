'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

import type { PlaylistFormField } from '@/app/playlists'
import { createPlaylist } from '@/app/playlists/actions/create-playlist'
import { getPlaylistCreationValidationErrors } from '@/app/playlists/components/create-playlist-form.errors'
import { CreatePlaylistFormFields } from '@/app/playlists/components/create-playlist-form-fields'
import { Form } from '@/forms/components/form'
import { useValidationErrors } from '@/forms/validation-errors'
import { handleUnknownClientError } from '@/helpers/errors'
import { useI18n } from '@/i18n'
import { ROUTES } from '@/routes'

export const CreatePlaylistForm: React.FC = () => {
  const [isFormSubmitting, setIsFormSubmitting] = React.useState<boolean>(false)
  const [validationErrors, setValidationErrors] = useValidationErrors<PlaylistFormField>(undefined)

  const router = useRouter()

  const { i18n } = useI18n()

  const handleFormSubmit = async (formData: FormData) => {
    try {
      setIsFormSubmitting(true)
      const playlistCreationResponse = await createPlaylist(formData)

      if (playlistCreationResponse.status === 'error') {
        const playlistCreationErrors = getPlaylistCreationValidationErrors(playlistCreationResponse.errors, i18n)
        setValidationErrors(playlistCreationErrors)
        return
      }

      toast.success(i18n('playlists.create.success'))

      const createdPlaylist = playlistCreationResponse.data
      router.push(`${ROUTES.edit}/${createdPlaylist.id}`)
    } catch (error) {
      handleUnknownClientError(error, i18n)
    } finally {
      setIsFormSubmitting(false)
    }
  }

  return (
    <Form
      action={handleFormSubmit}
      isDisabled={isFormSubmitting}
      submitLabel={i18n('playlists.create.submit-label')}
      validationErrors={validationErrors}
    >
      <CreatePlaylistFormFields validationErrors={validationErrors} />
    </Form>
  )
}
