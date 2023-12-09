'use client'

import type { Playlist } from '@prisma/client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from 'zod'

import type { Dictionary } from '@/Types'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/Components/base/ui/form'
import { Button, Input, Textarea } from '@/Components'
import { useToast } from '@/Hooks'
import { RULES } from '@/Config'

import styles from './playlist-form.styles.module.sass'
import { Save } from 'lucide-react'

type PlaylistFormProps = {
  playlist?: Playlist
  dictionary: Dictionary
}

const PLAYLIST_RULES = RULES.PLAYLIST

const PlaylistForm: React.FC<PlaylistFormProps> = ({ playlist, dictionary }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { toast } = useToast()
  const strings = dictionary.components.playlistForm

  const formSchema = z.object({
    title: z.string().trim()
      .min(1, { message: strings.title.required })
      .min(PLAYLIST_RULES.TITLE.MIN_LENGTH, { message: strings.title.lengthError })
      .max(PLAYLIST_RULES.TITLE.MAX_LENGTH, { message: strings.title.lengthError }),
    description: z.optional(z.string().trim()
      .min(PLAYLIST_RULES.DESCRIPTION.MIN_LENGTH, { message: strings.description.lengthError })
      .max(PLAYLIST_RULES.DESCRIPTION.MAX_LENGTH, { message: strings.description.lengthError })
    )
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: playlist?.title ?? '',
      description: playlist?.description ?? ''
    }
  })

  const onSubmitPlaylistForm = async (values: z.infer<typeof formSchema>) => {
    console.log(values)

    // ! gérer l'erreur prisma "existe déjà"
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitPlaylistForm)}>
        <fieldset
          className={styles['playlist-form']}
          disabled={isLoading}
        >
          <div className={styles['playlist-form__fields']}>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {strings.title.label}
                  </FormLabel>

                  <FormControl>
                    <Input
                      {...field}
                      placeholder={strings.title.placeholder}
                      required
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {strings.description.label}
                  </FormLabel>

                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder={strings.description.placeholder}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type='submit'
            className={styles['playlist-form__submit-button']}
          >
            <Save size='1.4em' />
            {dictionary.actions.save}
          </Button>
        </fieldset>
      </form>
    </Form>
  )
}

export default PlaylistForm
