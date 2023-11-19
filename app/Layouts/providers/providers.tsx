import {
  ThemeProvider
} from '@/Contexts'

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => (
  <ThemeProvider>
    {children}
  </ThemeProvider>
)
