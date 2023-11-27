'use client'

import type { FCWithStrings, PageProps } from '@/Types'
import { Background, Footer, Header, Navbar, Sidebar } from '@/Layouts'
import { useBreakpoint, useHue, useTheme } from '@/Hooks'
import { bodyFont, headingFont } from '@/Config'
import { cn } from '@/Lib'

import '@/styles/main.sass'

type ContainerProps = PageProps & React.PropsWithChildren

const Container: FCWithStrings<ContainerProps> = ({ children, strings, params }) => {
  const { isMobile } = useBreakpoint()
  const { isDarkModeActive } = useTheme()
  const { selectedHue } = useHue()

  return (
    <html lang={params.lang} suppressHydrationWarning>
      <body className={cn(
        headingFont.variable,
        bodyFont.variable,
        isDarkModeActive && 'dark',
        `hue-${selectedHue}`
      )}>
        <Background />

        <Header strings={strings} />

        <main>
          {children}
        </main>

        {isMobile
          ? <Navbar />
          : <>
              <Footer />
              <Sidebar />
            </>
        }
      </body>
    </html>
  )
}

export default Container
