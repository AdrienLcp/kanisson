import type { Metadata } from 'next'
import React from 'react'

import { Container } from '@/app/container'
import { Footer } from '@/app/footer'
import { Header } from '@/app/header'
import { Main } from '@/app/main'
import { getCommonMetadata } from '@/app/metadata'
import { Providers } from '@/app/providers'
import { getAuthenticatedUser } from '@/authentication/actions/get-authenticated-user'
import { buildI18n, type Locale } from '@/i18n'
import { getDictionary } from '@/i18n/server'
import { Navbar } from '@/routes/components/navbar'

import '@/styles/base.sass'

type CommonParams = {
  locale: Locale
}

type Params <T> = T extends null
  ? CommonParams
  : CommonParams & T

type PageParams <T> = {
  params: Params<T>
}

export type PageProps <T = null> = Readonly<PageParams<T>>
export type LayoutProps <T = null> = PageProps<T> & React.PropsWithChildren

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
