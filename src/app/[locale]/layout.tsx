import type { Metadata } from 'next'
import React from 'react'

import { Container } from '@/app/container'
import { getCommonMetadata } from '@/app/metadata'
import { Providers } from '@/app/providers'
import { getAuthUser } from '@/auth/actions/get-auth-user'
import { type Locale } from '@/i18n'
import { getDictionary } from '@/i18n/server'

import './layout.styles.sass'

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
  const commonMetadata = await getCommonMetadata(params.locale)
  return commonMetadata
}

const RootLayout: React.FC<LayoutProps> = async ({ children, params }) => {
  const locale = params.locale
  const dictionary = await getDictionary(locale)

  const user = await getAuthUser()

  return (
    <Providers
      dictionary={dictionary}
      locale={locale}
      user={user}
    >
      <Container locale={locale}>
        {children}
      </Container>
    </Providers>
  )
}

export default RootLayout
