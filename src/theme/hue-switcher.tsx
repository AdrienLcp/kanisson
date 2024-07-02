'use client'

import { CheckIcon } from 'lucide-react'
import React from 'react'

import { Label } from '@/components/label'
import { Pressable } from '@/components/pressable'
import { Tooltip } from '@/components/tooltip'
import { DEFAULT_ICON_SIZE, classNames } from '@/helpers/styles'
import { useI18n } from '@/i18n'
import { HUES, useHue } from '@/theme/hue'

import './hue-switcher.styles.sass'

export const HueSwitcher: React.FC = () => {
  const { changeHue, currentHue } = useHue()
  const { i18n } = useI18n()

  return (
    <section className='hue-switcher'>
      <Label>
        {i18n('theme.hue.title')}
      </Label>

      <ul className='hue-switcher__list'>
        {HUES.map(hue => (
          <li key={hue}>
            <Tooltip content={i18n(`theme.hue.colors.${hue}.tooltip`)}>
              <Pressable
                aria-label={hue}
                className={classNames('hue-switcher__list__button', hue)}
                key={hue}
                onPress={() => changeHue(hue)}
              >
                {currentHue === hue && (
                  <CheckIcon
                    className='hue-switcher__list__button__check-icon'
                    size={DEFAULT_ICON_SIZE}
                  />
                )}
              </Pressable>
            </Tooltip>
          </li>
        ))}
      </ul>
    </section>
  )
}
