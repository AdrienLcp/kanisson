'use client'

import type { Playlist } from '@prisma/client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from 'zod'

import { Form } from '@/Components/base/ui/form'
import { PlaylistForm, SubmitButton, TracksForm } from '@/Components'
import { useLocale, useToast } from '@/Hooks'
import { RULES } from '@/Config'

import styles from './edit-playlist.styles.module.sass'

type EditPlaylistProps = {
  playlist?: Playlist
  youtubeApiKey: string
}

const PLAYLIST_RULES = RULES.PLAYLIST

const EditPlaylist: React.FC<EditPlaylistProps> = ({ playlist, youtubeApiKey }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { toast } = useToast()

  const { dictionary } = useLocale()
  const strings = dictionary.components

  const formSchema = z.object({
    title: z.string().trim()
      .min(1, { message: strings.playlistForm.title.required })
      .min(PLAYLIST_RULES.TITLE.MIN_LENGTH, { message: strings.playlistForm.title.lengthError })
      .max(PLAYLIST_RULES.TITLE.MAX_LENGTH, { message: strings.playlistForm.title.lengthError }),
    description: z.optional(z.string().trim()
      .min(PLAYLIST_RULES.DESCRIPTION.MIN_LENGTH, { message: strings.playlistForm.description.lengthError })
      .max(PLAYLIST_RULES.DESCRIPTION.MAX_LENGTH, { message: strings.playlistForm.description.lengthError })
    )
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: playlist?.title ?? '',
      description: playlist?.description ?? ''
    }
  })

  const onSubmitEditPlaylist = async (values: z.infer<typeof formSchema>) => {
    console.log(values)

    // ! gérer l'erreur prisma "existe déjà"
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitEditPlaylist)}>
        <fieldset
          className={styles['edit-playlist']}
          disabled={isLoading}
        >
          <PlaylistForm form={form} />

          <TracksForm youtubeApiKey={youtubeApiKey} />

          <SubmitButton
            label={dictionary.actions.save}
            isLoading={isLoading}
          />
        </fieldset>
      </form>
    </Form>
  )
}

export default EditPlaylist
