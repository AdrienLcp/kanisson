'use server'

import type { Playlist } from '@prisma/client'

import type { AuthenticatedUserErrorCode } from '@/authentication'
import { getAuthenticatedUser } from '@/authentication/actions/get-authenticated-user'
import { handleError, type Result, success } from '@/helpers/result'
import prisma from '@/lib/prisma'
import { type PlaylistErrorCode, PlaylistCreationSchema } from '@/playlists'

export type CreatePlaylistRequest = {
  title: string
  description?: string
}

export type PlaylistCreationErrorCode = PlaylistErrorCode | AuthenticatedUserErrorCode

type CreatePlaylistResponse = Result<Playlist, PlaylistCreationErrorCode>

export const createPlaylist = async (request: CreatePlaylistRequest): Promise<CreatePlaylistResponse> => {
  try {
    const parsedRequest = PlaylistCreationSchema.safeParse(request)

    if (!parsedRequest.success) {
      console.error(parsedRequest.error)
    }

    const authenticationResponse = await getAuthenticatedUser()

    if (authenticationResponse.status === 'error') {
      return authenticationResponse
    }

    const playlistCreator = authenticationResponse.data

    const newPlaylist = await prisma.playlist.create({
      data: {
        title: request.title,
        description: request.description,
        userId: playlistCreator.id
      }
    })

    return success(newPlaylist)
  } catch (error) {
    return handleError(error)
  }
}
