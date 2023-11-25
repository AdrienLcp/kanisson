'use client'

import { Button } from '@/Components'
import { useTheme } from '@/Hooks'

const ThemeSwitcher: React.FC = () => {
  const { setTheme } = useTheme()

  return (
    <ul>
      <li key='0'>
        <Button onClick={() => setTheme('system')}>
          system
        </Button>
      </li>
      <li key='1'>
        <Button onClick={() => setTheme('dark')}>
          dark
        </Button>
      </li>
      <li key='2'>
        <Button onClick={() => setTheme('light')}>
          light
        </Button>
      </li>
    </ul>
  )
}

export default ThemeSwitcher
