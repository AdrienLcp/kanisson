import React from 'react'

import { Motion } from '@/components/motion'

export const Main: React.FC<React.PropsWithChildren> = ({ children }) => (
  <main>
    <Motion animation='fade-in-slow'>
      {children}
    </Motion>
  </main>
)
