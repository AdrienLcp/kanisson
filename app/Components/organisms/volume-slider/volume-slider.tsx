'use client'

import { useEffect, useState } from 'react'
import { Volume, Volume1, Volume2, VolumeX, X } from 'lucide-react'

import { getStoredItem, storeItem } from '@/Helpers'
import { Button, Slider, Tooltip } from '@/Components'
import { useLocale } from '@/Hooks'
import { cn } from '@/Lib'

import styles from './volume-slider.styles.module.sass'

const VolumeSlider: React.FC = () => {
  const [volume, setVolume] = useState<number>(50)
  const [isMuted, setIsMuted] = useState<boolean>(false)

  const { dictionary } = useLocale()

  const label = isMuted
    ? dictionary.components.volumeSlider.turnOn
    : dictionary.components.volumeSlider.turnOff

  useEffect(() => {
    const storedVolume = getStoredItem<number>('volume')

    if (storedVolume) {
      setVolume(storedVolume)
    }
  }, [])

  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume[0])
    storeItem('volume', newVolume[0])
  }

  const renderVolumeIcon = () => {
    if (isMuted) {
      return <VolumeX />
    }

    if (volume <= 33) {
      return <Volume />
    }

    if (volume > 33 && volume <= 66) {
      return <Volume1 />
    }

    if (volume > 66) {
      return <Volume2 />
    }
  }

  return (
    <div className={styles['volume-controls']}>
      <Tooltip content={label}>
        <Button
          size='icon'
          variant='outline'
          aria-label={label}
          onClick={() => setIsMuted(prev => !prev)}
        >
          {renderVolumeIcon()}
        </Button>
      </Tooltip>

      <Slider
        className={cn(
          styles['volume-controls__slider'],
          isMuted && styles['disabled']
        )}
        value={[volume]}
        step={1}
        max={100}
        onValueChange={handleVolumeChange}
        disabled={isMuted}
        color='red'
      />

      <span className={styles['volume-controls__value']}>
        {isMuted ? <X /> : volume}
      </span>
    </div>
  )
}

export default VolumeSlider
