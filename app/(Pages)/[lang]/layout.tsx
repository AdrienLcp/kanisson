import type { Metadata } from 'next'

import type { PageProps } from '@/Types'
import { Background, Footer, Header, MainNav, Providers } from '@/Layouts'
import { bodyFont, headingFont, I18N } from '@/Config'
import { getDictionary } from '@/Helpers'
import { cn } from '@/Lib'

import '@/styles/globals.sass'

export const generateStaticParams = async () => {
  return I18N.locales.map(locale => ({ lang: locale.key }))
}

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const strings = await getDictionary(params.lang)

  return {
    title: strings.app.title,
    description: strings.app.description,
  }
}

type RootLayoutProps = PageProps & React.PropsWithChildren

const RootLayout: React.FC<RootLayoutProps> = async ({ children, params }) => {
  const strings = await getDictionary(params.lang)

  return (
    <html lang={params.lang} suppressHydrationWarning>
      <body className={cn(
        headingFont.variable,
        bodyFont.variable
      )}>
        <Providers>

          <Background />

          <Header strings={strings} />

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
