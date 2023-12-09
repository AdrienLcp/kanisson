'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from 'zod'

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/Components/base/ui/form'

import type { Dictionary, PrivateUser } from '@/Types'
import { updateUsername } from '@/Actions'
import { Button, Input } from '@/Components'
import { useToast } from '@/Hooks'
import { RULES } from '@/Config'

import styles from './profile-form.styles.module.sass'
import { Save } from 'lucide-react'

type ProfileFormProps = {
  user: PrivateUser
  dictionary: Dictionary
}

const USERNAME_RULES = RULES.USER.NAME

export const ProfileForm: React.FC<ProfileFormProps> = ({ user, dictionary }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { toast } = useToast()

  const strings = dictionary.pages.profile.form

  const formSchema = z.object({
    username: z.optional(z.string().trim()
      .min(1, { message: strings.usernameRequired })
      .min(USERNAME_RULES.MIN_LENGTH, { message: strings.usernameLengthError })
      .max(USERNAME_RULES.MAX_LENGTH, { message: strings.usernameLengthError })
    )
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user.pseudo ?? ''
    }
  })
  
  const onSubmitProfileForm = async (values: z.infer<typeof formSchema>) => {
    if (!values.username || values.username.trim() === user.pseudo) {
      toast({ description: strings.profileAlreadyUpToDate })
      return
    }

    try {
      setIsLoading(true)

      const request = { username: values.username, dictionary }
      const result = await updateUsername(request)

      result.status === 'success'
        ? toast({
            title: dictionary.api.type.success,
            description: strings.usernameUpdated
          })
        : toast({
            variant: 'destructive',
            title: dictionary.api.type.error,
            description: result.error
          })
    } catch (error) {
      console.error(error)
      toast({
        variant: 'destructive',
        title: dictionary.api.type.error,
        description: dictionary.api.errors.server.internal
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitProfileForm)}>
        <fieldset
          className={styles['profile-form']}
          disabled={isLoading}
        >
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {strings.usernameLabel}
                </FormLabel>

                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormDescription>
                  {strings.usernameDescription}
                </FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type='submit'
            className={styles['profile-form__submit-button']}
          >
            <Save size='1.4em' />
            {dictionary.actions.save}
          </Button>
        </fieldset>
      </form>
    </Form>
  )
}
