'use client'

import type { PlaylistForm as PlaylistFormType } from '@/Types'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/Components/base/ui/form'
import { Input, Textarea } from '@/Components'
import { useLocale } from '@/Hooks'

import styles from './playlist-form.styles.module.sass'

type PlaylistFormProps = {
  form: PlaylistFormType
}

const PlaylistForm: React.FC<PlaylistFormProps> = ({ form }) => {
  const { dictionary } = useLocale()
  const strings = dictionary.components.playlistForm

  return (
    <div className={styles['form-playlist']}>
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
  )
}

export default PlaylistForm
