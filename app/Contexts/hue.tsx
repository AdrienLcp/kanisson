import React from 'react'

import { getStoredItem, storeItem } from '@/Helpers'
import { HUES } from '@/Config'

export type Hue = typeof HUES[number]

type HueContext = {
  selectedHue: Hue
  setHue: (hue: Hue) => void
}

export const HueContext = React.createContext<HueContext | null>(null)

export const HueProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [selectedHue, setSelectedHue] = React.useState<Hue>('neutral')

  const setHue = (hue: Hue) => {
    if (HUES.includes(hue)) {
      setSelectedHue(hue)
      storeItem('hue', hue)
      window.document.body.setAttribute('hue', hue)
    }
  }

  React.useEffect(() => {
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
