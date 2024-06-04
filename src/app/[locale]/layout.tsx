import type { Metadata } from 'next'
import React from 'react'

import { Body } from '@/app/body'
import { Footer } from '@/app/footer'
import { Header } from '@/app/header'
import { getCommonMetadata } from '@/app/metadata'
import { Providers } from '@/app/providers'
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
  return await getCommonMetadata(params.locale)
}

const RootLayout: React.FC<LayoutProps> = async ({ children, params }) => {
  const locale = params.locale
  const dictionary = await getDictionary(locale)

  return (
    <Providers
      dictionary={dictionary}
      locale={locale}
    >
      <html lang={locale}>
        <Body>
          <Header />

          <main>
            <React.Suspense fallback={<div>Loading...</div>}>
              {children}
            </React.Suspense>
          </main>

          <Footer />
        </Body>
      </html>
    </Providers>
  )
}

export default RootLayout
