import type { Metadata } from 'next'

import type { PageProps } from '@/Types'
import { APP, bodyFont, Dictionary, getDictionary , headingFont, I18N } from '@/Config'
import { Background, Footer, Header, MainNav, Providers } from '@/Layouts'
import { cn } from '@/Lib'

import '@/styles/globals.sass'

export const metadata: Metadata = {
  title: APP.TITLE,
  description: APP.DEFAULT_DESCRIPTION,
}

export const generateStaticParams = async () => {
  return I18N.locales.map(locale => ({ lang: locale }))
}

type RootLayoutProps = PageProps & React.PropsWithChildren

const RootLayout: React.FC<RootLayoutProps> = async ({ children, params }) => {
  const strings: Dictionary = await getDictionary(params.lang)

  return (
    <html lang={params.lang} suppressHydrationWarning>
      <body className={cn(
        headingFont.variable,
        bodyFont.variable
      )}>
        <Providers>

          <Background />

          <Header title={strings.app.title} />

          <main>
            {children}
          </main>
          
          <Footer />

          <MainNav />
          
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
