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

        <div className='overlay overlay__top' />

        <main>
          {children}
        </main>

        <div className='overlay overlay__bottom' />

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
