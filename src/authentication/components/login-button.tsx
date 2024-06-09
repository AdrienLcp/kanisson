'use client'

import { signIn } from 'next-auth/react'
import React from 'react'

import { Button } from '@/components/button'
import { UserIcon } from 'lucide-react'

export const LoginButton: React.FC = () => (
  <div className='login-button'>
    <Button
      Icon={UserIcon}
      onPress={async () => {
        await signIn()
      }}
      variant='primary'
    >
      Login
    </Button>
  </div>
)
