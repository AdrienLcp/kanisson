import type { Metadata } from 'next'
import React from 'react'

import { Body } from '@/app/body'
import { Footer } from '@/app/footer'
import { Header } from '@/app/header'
import { getCommonMetadata } from '@/app/metadata'
import { Providers } from '@/app/providers'
import { getAuthUser } from '@/auth/actions/get-auth-user'
import { type Locale } from '@/i18n'
import { getDictionary } from '@/i18n/server'

import '@/styles/base.sass'
import { Avatar } from '@/components/avatar'

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

  const authUser = await getAuthUser()

  return (
    <Providers
      dictionary={dictionary}
      locale={locale}
      user={authUser}
    >
      <html lang={locale}>
        <Body>
          <Header />

          <main>
            {children}

            <Avatar user={authUser} />
          </main>

          <Footer />
        </Body>
      </html>
    </Providers>
  )
}

export default RootLayout
