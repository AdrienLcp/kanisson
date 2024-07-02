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
import type { LayoutProps } from '@/lib/next-js'
import { Navbar } from '@/routes/components/navbar'

import '@/styles/base.sass'

const commonMetadata = getCommonMetadata()

export const metadata: Metadata = {
  ...commonMetadata
}

const RootLayout: React.FC<LayoutProps> = async ({ children }) => {
  const authenticatedUserResponse = await getAuthenticatedUser()

  const authenticatedUser = authenticatedUserResponse.status === 'success'
    ? authenticatedUserResponse.data
    : null

  const authenticatedUserPermissions = authenticatedUser === null
    ? []
    : authenticatedUser.permissions

  return (
    <Providers authenticatedUser={authenticatedUser}>
      <Container>
        <Header authenticatedUser={authenticatedUser} />

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
