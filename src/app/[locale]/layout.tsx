import type { Metadata } from 'next'
import React from 'react'

import { Body } from '@/app/body'
import { Footer } from '@/app/footer'
import { Header } from '@/app/header'
import { Main } from '@/app/main'
import { getCommonMetadata } from '@/app/metadata'
import { Providers } from '@/app/providers'
import { getAuthenticatedUser } from '@/authentication/actions/get-authenticated-user'
import { buildI18n, type Locale } from '@/i18n'
import { getDictionary } from '@/i18n/server'

import '@/styles/base.sass'
import { Button } from '@/components/button'

type CommonParams = {
  locale: Locale
}

type Params <T> = T extends null
  ? CommonParams
  : CommonParams & T

type PageParams <T> = {
  params: Params<T>
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export type PageProps <T = null> = Readonly<PageParams<T>>
export type LayoutProps <T = null> = PageProps<T> & React.PropsWithChildren

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  return await getCommonMetadata(params.locale)
}

const RootLayout: React.FC<LayoutProps> = async ({ children, params }) => {
  const locale = params.locale
  const dictionary = await getDictionary(locale)
  const i18n = buildI18n(dictionary, locale)

  const authenticatedUser = await getAuthenticatedUser()

  return (
    <Providers
      dictionary={dictionary}
      locale={locale}
      authenticatedUser={authenticatedUser}
    >
      <html lang={locale}>
        <Body>
          <Header
            authenticatedUser={authenticatedUser}
            i18n={i18n}
          />

          <Main>
            <Button>test</Button>
            {children}
          </Main>

          <Footer />
        </Body>
      </html>
    </Providers>
  )
}

export default RootLayout
