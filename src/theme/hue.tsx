'use client'

import React from 'react'

import { useProvidedContext } from '@/helpers/contexts'
import { getStoredItem, storeItem } from '@/helpers/local-storage'

// Hue names need to match with 'hue' class names used in src/styles/colors.sass
export const HUES = ['neutral', 'blue', 'green', 'orange', 'pink', 'purple', 'red', 'yellow'] as const
export type Hue = typeof HUES[number]

export const isHue = (hue: string): hue is Hue => {
  return HUES.includes(hue as Hue)
}

type HueContextValue = {
  changeHue: (newHue: Hue) => void
  currentHue: Hue
}

const HueContext = React.createContext<HueContextValue | null>(null)

export const HueProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [currentHue, setCurrentHue] = React.useState<Hue>('neutral')

  const changeHue = (newHue: Hue) => {
    if (!HUES.includes(newHue)) {
      return
    }

    setCurrentHue(newHue)
    storeItem('hue', newHue)
  }

  React.useEffect(() => {
    const storedHue = getStoredItem('hue')

    if (storedHue !== undefined) {
      changeHue(storedHue)
    }
  }, [])

  return (
    <HueContext.Provider value={{ changeHue, currentHue }}>
      {children}
    </HueContext.Provider>
  )
}

export const useHue = () => useProvidedContext(HueContext, 'Hue')
