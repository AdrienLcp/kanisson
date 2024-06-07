'use client'

import React from 'react'

import type { PageProps } from '@/app/[locale]/layout'

import './page.styles.sass'
import { Button } from '@/components/button'
import { User } from 'lucide-react'

const Home: React.FC<PageProps> = () => {
  return (
    <div>
      home
      <Button Icon={User} isLoading>click</Button>
    </div>
  )
}

export default Home
