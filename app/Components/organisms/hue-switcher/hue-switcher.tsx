'use client'

import { Tooltip } from '@/Components'
import { useHue, useLocale } from '@/Hooks'
import { HUES } from '@/Config'
import { cn } from '@/Lib'

import styles from './hue-switcher.styles.module.sass'

const HueSwitcher: React.FC = () => {
  const { setHue, selectedHue } = useHue()
  const { dictionary } = useLocale()
  const strings = dictionary.components.hueSwitcher

  return (
    <ul className={styles['switcher-list']}>
      {HUES.map(hue => (
        <li key={hue}>
          <Tooltip content={strings[hue]}>
            <button
              style={{ '--color': `var(--theme-${hue})` } as React.CSSProperties}
              className={cn(
                styles['switcher-list__button'],
                selectedHue === hue && styles['selected']
              )}
              onClick={() => setHue(hue)}
            />            
          </Tooltip>
        </li>
      ))}
    </ul>
  )
}

export default HueSwitcher
