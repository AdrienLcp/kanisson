import * as z from 'zod'
import { UseFormReturn } from 'react-hook-form'

import { RULES } from '@/Config'

const PLAYLIST_RULES = RULES.PLAYLIST
const TRACK_RULES = RULES.TRACK

const formSchema = z.object({
  title: z.string(),
  description: z.optional(z.string())
})

type PlaylistFormData = z.infer<typeof formSchema>

export type PlaylistForm = UseFormReturn<PlaylistFormData>
