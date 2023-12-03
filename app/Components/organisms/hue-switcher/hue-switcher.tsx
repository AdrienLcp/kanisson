'use client'

import { useHue } from '@/Hooks'
import { HUES } from '@/Config'
import { cn } from '@/Lib'

import styles from './hue-switcher.styles.module.sass'

const HueSwitcher: React.FC = () => {
  const { setHue, selectedHue } = useHue()

  return (
    <ul className={styles['switcher-list']}>
      {HUES.map(hue => (
        <li key={hue}>
          <button
            style={{ '--color': `var(--theme-${hue})` } as React.CSSProperties}
            className={cn(
              styles['switcher-list__button'],
              selectedHue === hue && styles['selected']
            )}
            onClick={() => setHue(hue)}
          />
        </li>
      ))}
    </ul>
  )
}

export default HueSwitcher
