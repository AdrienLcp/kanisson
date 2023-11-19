import type { Metadata } from 'next'

import type { PageProps } from '@/Types'
import { bodyFont, headingFont, I18N } from '@/Config'
import { Footer, Header, MainNav, Providers } from '@/Layouts'
import { cn } from '@/Lib'

import '@/styles/globals.css'
import '@/styles/globals.sass'

export const metadata: Metadata = {
  title: 'Kanisson',
  description: 'Blind test games',
}

export const generateStaticParams = async () => {
  return I18N.locales.map(locale => ({ lang: locale }))
}

type RootLayoutProps = PageProps & React.PropsWithChildren

const RootLayout: React.FC<RootLayoutProps> = async ({ children, params }) => {
  return (
    <html lang={params.lang}>
      <body className={cn(
        headingFont.variable,
        bodyFont.variable
      )}>
        <Providers>

          <Header />

          <MainNav />

          <main>
            {children}
          </main>
          
          <Footer />
          
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
