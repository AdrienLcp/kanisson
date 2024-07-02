'use server'

import type { Playlist } from '@prisma/client'
import { z } from 'zod'

import type { PlaylistErrorCode } from '@/app/playlists'
import type { AuthenticationErrorCode } from '@/authentication'
import { getAuthSession } from '@/authentication/server'
import { error, success, type Result } from '@/helpers/result'
import { handleUnknownServerError } from '@/helpers/errors'
import prisma from '@/lib/prisma'

type GetPlaylistByIdErrorCode = AuthenticationErrorCode | PlaylistErrorCode
type GetPlaylistByIdResponse = Result<Playlist, GetPlaylistByIdErrorCode>

const GetPlaylistByIdSchema = z.string()

export const getPlaylistById = async (playlistId: string): Promise<GetPlaylistByIdResponse> => {
  try {
    const getPlaylistValidation = GetPlaylistByIdSchema.safeParse(playlistId)

    if (getPlaylistValidation.error) {
      return error('bad_request')
    }

    const authSession = await getAuthSession()

    if (authSession === null) {
      return error('unauthenticated')
    }

    const playlist = await prisma.playlist.findUnique({ where: { id: playlistId } })

    if (playlist === null) {
      return error('playlist_not_found')
    }

    if (playlist.userId !== authSession.user.id) {
      return error('playlist_does_not_belong_to_you')
    }

    return success(playlist)
  } catch (error) {
    return handleUnknownServerError(error)
  }
}
