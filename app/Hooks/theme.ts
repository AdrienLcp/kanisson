import { useTheme as useNextTheme } from 'next-themes'

type Theme = 'system' | 'light' | 'dark'

export const useTheme = () => {
  const { setTheme: setNextTheme } = useNextTheme()

  const setTheme = (theme: Theme) => {
    setNextTheme(theme)
  }

  return { setTheme }
}
