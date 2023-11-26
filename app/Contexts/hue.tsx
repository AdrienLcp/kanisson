'use client'

import { createContext, useEffect, useState } from 'react'

import type { Hue } from '@/Types'
import { getStoredItem, storeItem } from '@/Helpers'
import { HUES, DEFAULT_HUE } from '@/Config'

type HueContext = {
  selectedHue: Hue
  setHue: (hue: Hue) => void
}

export const HueContext = createContext<HueContext | null>(null)

export const HueProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [selectedHue, setSelectedHue] = useState<Hue>(DEFAULT_HUE)

  const setHue = (hue: Hue) => {
    if (HUES.includes(hue)) {
      setSelectedHue(hue)
      storeItem('hue', hue)
    }
  }

  useEffect(() => {
    const storedHue = getStoredItem<Hue>('hue')

    if (storedHue) {
      setHue(storedHue)
    }
  }, [])

  return (
    <HueContext.Provider value={{ selectedHue, setHue }}>
      {children}
    </HueContext.Provider>
  )
}
