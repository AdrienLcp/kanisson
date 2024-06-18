'use client'

import { UserIcon } from 'lucide-react'
import { signIn } from 'next-auth/react'
import React from 'react'

import { Button } from '@/components/button'

const handleLoginButtonClick = async () => {
  await signIn()
}

export const LoginButton: React.FC = () => (
  <Button
    Icon={UserIcon}
    onPress={handleLoginButtonClick}
    variant='primary'
  >
    Login
  </Button>
)
