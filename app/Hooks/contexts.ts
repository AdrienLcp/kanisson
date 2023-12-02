import { useContext } from 'react'

import { AuthContext, HueContext, LocaleContext, ThemeContext } from '@/Contexts'

const useValidContext = <T>(currentContext: React.Context<T>, contextName: string) => {
  const context = useContext(currentContext)

  if (context === null) {
    throw new Error(`${contextName} context provider React node is missing in app definition`)
  }

  return context
}

export const useAuth = () => useValidContext(AuthContext, 'Auth')
export const useHue = () => useValidContext(HueContext, 'Hue')
export const useLocale = () => useValidContext(LocaleContext, 'Locale')
export const useTheme = () => useValidContext(ThemeContext, 'Theme')
