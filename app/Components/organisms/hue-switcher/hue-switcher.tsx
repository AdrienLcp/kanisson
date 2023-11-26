'use client'

import { Button } from '@/Components'
import { useHue } from '@/Hooks'

const HueSwitcher: React.FC = () => {
  const { setHue } = useHue()

  return (
    <div>
      <Button onClick={() => setHue('neutral')}>
        NEUTRAL
      </Button>
      <Button onClick={() => setHue('blue')}>
        BLUE
      </Button>
      <Button onClick={() => setHue('red')}>
        RED
      </Button>
      <Button onClick={() => setHue('yellow')}>
        YELLOW
      </Button>
      <Button onClick={() => setHue('purple')}>
        PURPLE
      </Button>
    </div>
  )
}

export default HueSwitcher
