'use client'

import React from 'react'

import { HUES, useHue } from '@/theme/hue'

export const HueSwitcher: React.FC = () => {
  const { changeHue, currentHue } = useHue()

  return (
    <div className='hue-switcher'>
      {HUES.map(hue => (
        <button
          key={hue}
          onClick={() => changeHue(hue)}
          style={{ padding: '10px 25px', background: hue === currentHue ? 'green' : 'red' }}
        >
          {hue}
        </button>
      ))}
    </div>
  )
}
