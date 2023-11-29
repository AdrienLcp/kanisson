import type { Metadata } from 'next'

import type { PageProps } from '@/Types'
import { Container, Providers } from '@/Layouts'
import { getDictionary } from '@/I18n'
import { I18N } from '@/Config'

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
    <Providers strings={strings}>
      <Container params={params}>
        {children}
      </Container>
    </Providers>
  )
}

export default RootLayout
