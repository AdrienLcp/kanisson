'use client'

import { useSession } from 'next-auth/react'

import type { FCWithStrings } from '@/Types'
import { Avatar } from '@/Components'

const PersonaMenu: FCWithStrings = ({ strings }) => {
  const session = useSession()

  return (
    <>
      {session.data && (
        <Avatar
          user={session.data.user}
          strings={strings}
        />
      )}
    </>
  )
}

export default PersonaMenu
