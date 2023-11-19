'use client'

import { Button } from '@/Components'
import { useTheme } from 'next-themes'

const Home = () => {
  const { setTheme } = useTheme()
  return (
    <>
      <Button onClick={() => setTheme('light')}>
        light
      </Button>
      <Button onClick={() => setTheme('dark')}>
        dark
      </Button>
      <Button onClick={() => setTheme('system')}>
        system
      </Button>
    </>
  )
}

export default Home
