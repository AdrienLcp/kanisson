import type { Metadata } from 'next'

import type { PageProps } from '@/Types'
import { Container, Providers } from '@/Layouts'
import { getAuthUser } from '@/Actions'
import { getDictionary } from '@/Locales'
import { I18N } from '@/Config'

export const dynamic = 'auto'
export const dynamicParams = true
export const revalidate = 600
export const fetchCache = 'auto'
export const runtime = 'nodejs'
export const preferredRegion = 'auto'
export const maxDuration = 5

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
  const dictionary = await getDictionary(params.lang)
  const user = await getAuthUser()

  return (
    <Providers dictionary={dictionary} user={user}>
      <Container params={params}>
        {children}
      </Container>
    </Providers>
  )
}

export default RootLayout
