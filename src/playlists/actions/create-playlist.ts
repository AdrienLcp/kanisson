'use server'

import type { Playlist } from '@prisma/client'
import { z } from 'zod'

import type { AuthenticationErrorCode } from '@/authentication'
import { getAuthenticatedUser } from '@/authentication/actions/get-authenticated-user'
import { type CommonErrorCode, error , handleError, type Result, success } from '@/helpers/result'
import prisma from '@/lib/prisma'
import { type PlaylistErrorCode, playlistErrors, PLAYLIST_RULES, playlistFormFields } from '@/playlists'
import { getZodErrorMessages } from '@/lib/zod'

export type PlaylistCreationErrorCode = PlaylistErrorCode | AuthenticationErrorCode | CommonErrorCode

type CreatePlaylistResponse = Result<Playlist, PlaylistCreationErrorCode>

const PlaylistCreationSchema = z.object({
  title: z
    .string()
    .min(PLAYLIST_RULES.TITLE_MIN_LENGTH, { message: playlistErrors.titleTooShort })
    .max(PLAYLIST_RULES.TITLE_MAX_LENGTH, { message: playlistErrors.titleTooLong }),
  description: z
    .string()
    .max(PLAYLIST_RULES.DESCRIPTION_MAX_LENGTH, { message: playlistErrors.descriptionTooLong })
    .optional()
})

const getPlaylistCreationErrorCode = (message: string): PlaylistCreationErrorCode => {
  switch (message) {
    case playlistErrors.descriptionTooLong:
      return playlistErrors.descriptionTooLong
    case playlistErrors.titleTooLong:
      return playlistErrors.titleTooLong
    case playlistErrors.titleTooShort:
      return playlistErrors.titleTooShort
    default:
      return 'bad_request'
  }
}

export const createPlaylist = async (formData: FormData): Promise<CreatePlaylistResponse> => {
  try {
    const createPlaylistForm = {
      title: formData.get(playlistFormFields.title),
      description: formData.get(playlistFormFields.description)
    }

    const playlistCreationValidation = PlaylistCreationSchema.safeParse(createPlaylistForm)

    if (playlistCreationValidation.error) {
      const zodErrorMessages = getZodErrorMessages(playlistCreationValidation.error)
      const errorCodes = zodErrorMessages.map(message => getPlaylistCreationErrorCode(message))

      return error(errorCodes)
    }

    const authenticationResponse = await getAuthenticatedUser()

    if (authenticationResponse.status === 'error') {
      return authenticationResponse
    }

    const playlistCreator = authenticationResponse.data

    const newPlaylist = await prisma.playlist.create({
      data: {
        title: 'request.title',
        description: 'request.description',
        userId: playlistCreator.id
      }
    })

    return success(newPlaylist)
  } catch (error) {
    return handleError(error)
  }
}
