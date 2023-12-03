'use client'

import { Toaster } from '@root/app/Components/base/ui/toaster'

import type { PageProps } from '@/Types'
import { Background, Footer, Header, Navbar, Sidebar } from '@/Layouts'
import { useBreakpoint, useHue, useTheme } from '@/Hooks'
import { bodyFont, headingFont } from '@/Config'
import { cn } from '@/Lib'

import '@/styles/main.sass'

type ContainerProps = PageProps & React.PropsWithChildren

const Container: React.FC<ContainerProps> = ({ children, params }) => {
  const { isDarkModeActive } = useTheme()
  const { isMobile } = useBreakpoint()
  const { selectedHue } = useHue()

  return (
    <html
      lang={params.lang}
      style={{ colorScheme: isDarkModeActive ? 'dark' : 'light' }}
    >
      <body className={cn(
        headingFont.variable,
        bodyFont.variable,
        isDarkModeActive && 'dark',
        `hue-${selectedHue}`
      )}>
        <Background />

        <Header />

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

        <Toaster />
      </body>
    </html>
  )
}

export default Container
