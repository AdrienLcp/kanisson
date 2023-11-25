'use client'

import { signIn, signOut } from 'next-auth/react'

import { Button } from '@/Components'

type AuthButtonProps = {
  isAuth: boolean
}

const AuthButton: React.FC<AuthButtonProps> = ({ isAuth }) => {
  return isAuth
    ? <Button onClick={async () => await signOut()}>Sign out</Button>
    : <Button onClick={async () => await signIn()}>Sign in</Button>
}

export default AuthButton
