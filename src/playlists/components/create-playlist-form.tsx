'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

import { Form } from '@/forms/components/form'
import { useValidationErrors } from '@/forms/validation-errors'
import { handleUnknownClientError } from '@/helpers/errors'
import { useI18n } from '@/i18n/client'
import type { PlaylistFormField } from '@/playlists'
import { createPlaylist } from '@/playlists/actions/create-playlist'
import { getPlaylistCreationValidationErrors } from '@/playlists/components/create-playlist-form.errors'
import { CreatePlaylistFormFields } from '@/playlists/components/create-playlist-form-fields'
import { ROUTES } from '@/routes'
import type { TrackResult } from '@/tracks'
import { Tracks } from '@/tracks/components/tracks'

import './create-playlist-form.styles.sass'

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

  const addTrackToPlaylist = (track: TrackResult) => {
    console.log(track)
  }

  return (
    <section className='create-playlist-form'>
      <Form
        action={handleFormSubmit}
        hasRequiredFields
        isDisabled={isFormSubmitting}
        submitLabel={i18n('playlists.create.submit-label')}
        validationErrors={validationErrors}
      >
        <CreatePlaylistFormFields validationErrors={validationErrors} />
      </Form>

      <Tracks addTrackToPlaylist={addTrackToPlaylist} />
    </section>
  )
}
