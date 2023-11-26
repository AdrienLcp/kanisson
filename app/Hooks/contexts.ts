
import { useContext } from 'react'

import { HueContext, ThemeContext } from '@/Contexts'

const useValidContext = <T>(currentContext: React.Context<T>, contextName: string) => {
  const context = useContext(currentContext)

  if (context === null) {
    throw new Error(`${contextName} context provider React node is missing in app definition`)
  }

  return context
}

export const useHue = () => useValidContext(HueContext, 'Hue')
export const useTheme = () => useValidContext(ThemeContext, 'Theme')
