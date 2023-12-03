'use client'

import type { Hue } from '@/Types'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Tooltip } from '@/Components'
import { useHue, useLocale } from '@/Hooks'
import { HUES } from '@/Config'
import { cn } from '@/Lib'

import styles from './hue-switcher.styles.module.sass'

type HueOption = {
  key: Hue
  label: string
}

const HueSwitcher: React.FC = () => {
  const { setHue, selectedHue } = useHue()
  const { dictionary } = useLocale()
  const strings = dictionary.components.hueSwitcher

  const huesOptions: HueOption[] = [
    {
      key: 'neutral',
      label: strings.neutral
    },
    {
      key: 'blue',
      label: strings.blue
    },
    {
      key: 'green',
      label: strings.green
    },
    {
      key: 'orange',
      label: strings.orange
    },
    {
      key: 'pink',
      label: strings.pink
    },
    {
      key: 'purple',
      label: strings.purple
    },
    {
      key: 'red',
      label: strings.red
    },
    {
      key: 'yellow',
      label: strings.yellow
    }
  ]

  return (
    <Select
      defaultValue={selectedHue}
      onValueChange={setHue}
    >
      <SelectTrigger>
        <SelectValue placeholder={strings.placeholder} />
      </SelectTrigger>

      <SelectContent align='start'>
        {huesOptions.map(({ key, label }) => (
          <SelectItem key={key} value={key}>
            <div className={styles['option']}>
              <div
                style={{ '--color': `var(--theme-${key})` } as React.CSSProperties}
                className={styles['option__color']}
              />

              {label}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default HueSwitcher
