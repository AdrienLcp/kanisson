import type { Metadata } from 'next'
import React from 'react'

import { Container } from '@/app/components/container'
import { Footer } from '@/app/components/footer'
import { Header } from '@/app/components/header'
import { Main } from '@/app/components/main'
import { getCommonMetadata } from '@/app/metadata'
import { Providers } from '@/app/components/providers'
import { getAuthenticatedUser } from '@/authentication/actions/get-authenticated-user'
import type { LayoutProps, PageProps } from '@/helpers/next-js'
import { buildI18n } from '@/i18n'
import { getDictionary } from '@/i18n/server'
import { Navbar } from '@/routes/components/navbar'

import '@/styles/base.sass'

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  return await getCommonMetadata(params.locale)
}

const RootLayout: React.FC<LayoutProps> = async ({ children, params }) => {
  const authenticatedUser = await getAuthenticatedUser()

  const locale = params.locale
  const dictionary = await getDictionary(locale)
  const i18n = buildI18n(dictionary, locale)

  return (
    <Providers
      dictionary={dictionary}
      locale={locale}
      authenticatedUser={authenticatedUser}
    >
      <Container locale={locale}>
        <Header
          authenticatedUser={authenticatedUser}
          i18n={i18n}
        />

        <Main>
          {children}
        </Main>

        <Footer />

        <Navbar />
      </Container>
    </Providers>
  )
}

export default RootLayout
