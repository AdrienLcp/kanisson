import React from 'react'

import { Motion } from '@/components/motion'

export const Main: React.FC<React.PropsWithChildren> = ({ children }) => (
  <main>
    <Motion animation='fade-in-slow' delay={0.75}>
      {children}
    </Motion>
  </main>
)
