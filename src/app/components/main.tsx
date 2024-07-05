import React from 'react'

import { Motion } from '@/components/motion'
import { PlayerProvider } from '@/player'

export const Main: React.FC<React.PropsWithChildren> = ({ children }) => (
  <main>
    <Motion animation='fade-in-slow' delay={0.75}>
      <PlayerProvider>
        {children}
      </PlayerProvider>
    </Motion>
  </main>
)
