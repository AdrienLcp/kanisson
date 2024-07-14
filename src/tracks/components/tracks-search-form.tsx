'use client'

import { PlusIcon, SearchIcon } from 'lucide-react'
import React from 'react'

import { Button } from '@/components/button'
import { Form } from '@/forms/components/form'
import { TextField } from '@/forms/components/text-field'
import { useI18n } from '@/i18n/client'
import { trackSearchFormField } from '@/tracks/components/tracks-search'

import './tracks-search-form.styles.sass'

type TracksSearchFormProps = React.PropsWithChildren & {
  isLoading?: boolean
  hasResults: boolean
  loadMoreTracks: () => void
  loadTracks: (formData: FormData) => void
}

export const TracksSearchForm: React.FC<TracksSearchFormProps> = ({
  children,
  hasResults,
  isLoading,
  loadMoreTracks,
  loadTracks
}) => {
  const { i18n } = useI18n()

  return (
    <Form
      action={loadTracks}
      className='tracks-search-form'
      isDisabled={isLoading}
    >
      <div className='tracks-search-form__controls'>
        <TextField
          className='tracks-search-form__controls__search-field'
          label={i18n('tracks.search.label')}
          name={trackSearchFormField.search}
          placeholder={i18n('tracks.search.placeholder')}
          type='search'
        />

        <Button
          Icon={SearchIcon}
          isLoading={isLoading}
          size='icon'
          type='submit'
          variant='outline'
        />
      </div>

      {hasResults && (
        <div className='tracks-search-form__results-list'>
          {children}

          <div className='tracks-search-form__results-list__footer'>
            <Button
              Icon={PlusIcon}
              isLoading={isLoading}
              onPress={loadMoreTracks}
              variant='outline'
            >
              {i18n('tracks.search.load-more')}
            </Button>
          </div>
        </div>
      )}
    </Form>
  )
}
