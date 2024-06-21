'use client'

import { CheckIcon } from 'lucide-react'
import React from 'react'

import { Pressable } from '@/components/pressable'
import { Section } from '@/components/section'
import { Tooltip } from '@/components/tooltip'
import { classNames } from '@/helpers/styles'
import { useI18n } from '@/i18n/client'
import { HUES, useHue } from '@/theme/hue'

import './hue-switcher.styles.sass'

export const HueSwitcher: React.FC = () => {
  const { changeHue, currentHue } = useHue()
  const { i18n } = useI18n()

  return (
    <Section
      title={i18n('hue.title')}
      subtitle={i18n('hue.subtitle')}
    >
      <ul className='hue-switcher'>
        {HUES.map(hue => (
          <li key={hue}>
            <Tooltip key={hue} content={i18n(`hue.colors.${hue}.tooltip`)}>
              <Pressable
                aria-label={hue}
                className={classNames('hue-switcher__button', hue)}
                key={hue}
                onPress={() => changeHue(hue)}
              >
                {currentHue === hue && (
                  <CheckIcon className='hue-switcher__button__check-icon' />
                )}
              </Pressable>
            </Tooltip>
          </li>
        ))}
      </ul>
    </Section>
  )
}
