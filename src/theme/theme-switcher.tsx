'use client'

import { THEMES, useTheme } from '@/theme'
import React from 'react'

export const ThemeSwitcher: React.FC = () => {
  const { changeTheme, currentTheme } = useTheme()

  return (
    <div className='theme-switcher'>
      {THEMES.map(theme => (
        <button
          key={theme}
          onClick={() => changeTheme(theme)}
          style={{ padding: '10px 25px', background: theme === currentTheme ? 'green' : 'red' }}
        >
          {theme}
        </button>
      ))}
    </div>
  )
}
