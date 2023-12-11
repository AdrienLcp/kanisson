'use client'

import { useEffect, useState } from 'react'

import { useDebounce, useLocale } from '@/Hooks'
import { Input, Label } from '@/Components'

import styles from './track-search-input.styles.module.sass'

type TrackSearchInputProps = {
  onSubmitTrackSearch: (value: string) => void
}

const TrackSearchInput: React.FC<TrackSearchInputProps> = ({ onSubmitTrackSearch }) => {
  const [searchValue, setSearchValue] = useState<string>('')
  const debouncedSearchValue = useDebounce(searchValue)
  const { dictionary } = useLocale()
  const strings = dictionary.components.trackSearchInput

  useEffect(() => {
    if (debouncedSearchValue) {
      onSubmitTrackSearch(debouncedSearchValue)
    }
  }, [debouncedSearchValue, onSubmitTrackSearch])

  return (
    <Label>
      {strings.label}

      <Input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className={styles['input']}
      />
    </Label>
  )
}

export default TrackSearchInput
