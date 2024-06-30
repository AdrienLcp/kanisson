import type { Metadata } from 'next'
import React from 'react'

import { Container } from '@/app/components/container'
import { Footer } from '@/app/components/footer'
import { Header } from '@/app/components/header'
import { Main } from '@/app/components/main'
import { getCommonMetadata } from '@/app/metadata'
import { Providers } from '@/app/components/providers'
import { Toaster } from '@/app/components/toaster'
import { getAuthenticatedUser } from '@/authentication/actions/get-authenticated-user'
import { buildI18n } from '@/i18n'
import { getDictionary, getI18n } from '@/i18n/server'
import type { LayoutProps, PageProps } from '@/lib/next-js'
import { Navbar } from '@/routes/components/navbar'

import '@/styles/base.sass'

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const locale = params.locale
  const i18n = await getI18n(locale)
  return await getCommonMetadata(i18n, locale)
}

const RootLayout: React.FC<LayoutProps> = async ({ children, params }) => {
  const locale = params.locale
  const dictionary = await getDictionary(locale)
  const i18n = buildI18n(dictionary, locale)

  const authenticatedUserResponse = await getAuthenticatedUser()

  const authenticatedUser = authenticatedUserResponse.status === 'success'
    ? authenticatedUserResponse.data
    : null

  const authenticatedUserPermissions = authenticatedUser === null
    ? []
    : authenticatedUser.permissions

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

        <Navbar authenticatedUserPermissions={authenticatedUserPermissions} />

        <Toaster />
      </Container>
    </Providers>
  )
}

export default RootLayout
