import React from 'react'

import { getAuthUser } from '@/auth/actions/get-auth-user'

const HeaderServer: React.FC = async () => {
  const user = await getAuthUser()

  return (
    <>
      {user?.name}
    </>
  )
}

const HeaderFallback: React.FC = () => (
  <>
    Header loading...
  </>
)

export const Header: React.FC = () => (
  <header>
    <React.Suspense fallback={<HeaderFallback />}>
      <HeaderServer />
    </React.Suspense>
  </header>
)
