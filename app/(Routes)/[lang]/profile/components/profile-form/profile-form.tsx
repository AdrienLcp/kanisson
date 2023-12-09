'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from 'zod'

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/Components/base/ui/form'

import type { PrivateUser } from '@/Types'
import { updateUsername } from '@/Actions'
import { Button, Input } from '@/Components'
import { useLocale, useToast } from '@/Hooks'
import { RULES } from '@/Config'

import styles from './profile-form.styles.module.sass'

type ProfileFormProps = {
  user: PrivateUser
}

const USERNAME_RULES = RULES.USER.NAME

export const ProfileForm: React.FC<ProfileFormProps> = ({ user }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { toast } = useToast()

  const { dictionary } = useLocale()
  const strings = dictionary.pages.profile.form

  const formSchema = z.object({
    username: z.string()
      .min(1, { message: strings.usernameRequired })
      .min(USERNAME_RULES.MIN_LENGTH, { message: strings.usernameLengthError })
      .max(USERNAME_RULES.MAX_LENGTH, { message: strings.usernameLengthError })
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user.pseudo ?? ''
    }
  })
  
  const onSubmitProfileForm = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true)

      const request = { username: values.username, dictionary }
      const result = await updateUsername(request)

      result.status === 'success'
        ? toast({
            title: dictionary.api.type.success,
            description: strings.usernameUpdated,
          })
        : toast({
            variant: 'destructive',
            title: dictionary.api.type.error,
            description: result.error
          })
    } catch (error) {
      console.error(error)
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
                  {strings.username}
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

          <Button type='submit' className={styles['profile-form__submit-button']}>
            {dictionary.actions.save}
          </Button>
        </fieldset>
      </form>
    </Form>
  )
}
