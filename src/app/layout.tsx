import type { Metadata } from 'next'
import React from 'react'

import { Container } from '@/app/components/container'
import { Footer } from '@/app/components/footer'
import { Header } from '@/app/components/header'
import { Main } from '@/app/components/main'
import { getBaseMetadata } from '@/app/metadata'
import { Providers } from '@/app/components/providers'
import { Toaster } from '@/app/components/toaster'
import type { LayoutProps } from '@/lib/next'
import { Navbar } from '@/routes/navbar'

import '@/styles/base.sass'

const baseMetadata = getBaseMetadata()

export const metadata: Metadata = {
  ...baseMetadata
}

const RootLayout: React.FC<LayoutProps> = ({ children }) => (
  <Providers>
    <Container>

      <Header />

      <Main>
        {children}
      </Main>

      <Footer />

      <Navbar />

      <Toaster />

    </Container>
  </Providers>
)

export default RootLayout
