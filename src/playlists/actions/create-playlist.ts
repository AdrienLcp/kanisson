'use server'

import type { Playlist } from '@prisma/client'
import { z } from 'zod'

import type { AuthenticationErrorCode } from '@/authentication'
import { getAuthenticatedUserWithPermissions } from '@/authentication/permissions'
import { handleUnknownServerError } from '@/helpers/errors'
import { type CommonErrorCode, error, type Result, success } from '@/helpers/result'
import prisma, { getPrismaError } from '@/lib/prisma'
import { getZodErrorMessages } from '@/lib/zod'
import { type PlaylistErrorCode, playlistZodErrors, PLAYLIST_RULES, playlistFormFields, isPlaylistZodErrorCode } from '@/playlists'

export type PlaylistCreationErrorCode = AuthenticationErrorCode | CommonErrorCode | PlaylistErrorCode

type CreatePlaylistResponse = Result<Playlist, PlaylistCreationErrorCode>

const PlaylistCreationSchema = z.object({
  title: z
    .string()
    .min(PLAYLIST_RULES.TITLE_MIN_LENGTH, { message: playlistZodErrors.titleTooShort })
    .max(PLAYLIST_RULES.TITLE_MAX_LENGTH, { message: playlistZodErrors.titleTooLong }),
  description: z
    .string()
    .max(PLAYLIST_RULES.DESCRIPTION_MAX_LENGTH, { message: playlistZodErrors.descriptionTooLong })
    .optional()
})

const getPlaylistCreationZodErrorCode = (message: string): PlaylistCreationErrorCode => {
  if (isPlaylistZodErrorCode(message)) {
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

    const authenticationResponse = await getAuthenticatedUserWithPermissions('create_playlist')

    if (authenticationResponse.status === 'error') {
      return authenticationResponse
    }

    const playlistCreator = authenticationResponse.data

    const newPlaylist = await prisma.playlist.create({
      data: {
        title: playlistCreationValidation.data.title,
        description: playlistCreationValidation.data.description,
        userId: playlistCreator.id
      }
    })

    return success(newPlaylist)
  } catch (baseError) {
    const prismaError = getPrismaError(baseError)

    if (prismaError !== null) {
      const playlistsPrismaErrors: PlaylistErrorCode[] = []

      if (prismaError.code === 'unique_constraint_violation') {
        if (prismaError.fields.includes(playlistFormFields.title)) {
          playlistsPrismaErrors.push('title_already_exists')
        }
      }

      if (playlistsPrismaErrors.length > 0) {
        return error(playlistsPrismaErrors)
      }
    }

    return handleUnknownServerError(baseError)
  }
}
