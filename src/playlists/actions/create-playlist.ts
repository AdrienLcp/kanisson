'use server'

import type { Playlist } from '@prisma/client'
import { z } from 'zod'

import type { AuthenticationErrorCode } from '@/authentication'
import { getAuthenticatedUser } from '@/authentication/actions/get-authenticated-user'
import { type CommonErrorCode, error , handleError, type Result, success } from '@/helpers/result'
import prisma from '@/lib/prisma'
import { getZodErrorMessages } from '@/lib/zod'
import { type PlaylistErrorCode, playlistErrors, PLAYLIST_RULES, playlistFormFields } from '@/playlists'

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

const playlistErrorsCodes: string[] = Object.values(playlistErrors)

const isPlaylistErrorCode = (errorCode: string): errorCode is PlaylistErrorCode => {
  return playlistErrorsCodes.includes(errorCode)
}

const getPlaylistCreationZodErrorCode = (message: string): PlaylistCreationErrorCode => {
  if (isPlaylistErrorCode(message)) {
    return message
  }

  return 'bad_request'
}

export const createPlaylist = async (formData: FormData): Promise<CreatePlaylistResponse> => {
  try {
    const createPlaylistRequest = {
      title: formData.get(playlistFormFields.title),
      description: formData.get(playlistFormFields.description)
    }

    const playlistCreationValidation = PlaylistCreationSchema.safeParse(createPlaylistRequest)

    if (playlistCreationValidation.error) {
      const zodErrorMessages = getZodErrorMessages(playlistCreationValidation.error)
      const errorCodes = zodErrorMessages.map(message => getPlaylistCreationZodErrorCode(message))

      return error(errorCodes)
    }

    const authenticationResponse = await getAuthenticatedUser()

    if (authenticationResponse.status === 'error') {
      return authenticationResponse
    }

    const playlistCreator = authenticationResponse.data

    if (!playlistCreator.permissions.includes('create_playlist')) {
      return error('unauthorized')
    }

    const newPlaylist = await prisma.playlist.create({
      data: {
        title: playlistCreationValidation.data.title,
        description: playlistCreationValidation.data.description,
        userId: playlistCreator.id
      }
    })

    return success(newPlaylist)
  } catch (error) {
    return handleError(error)
  }
}
