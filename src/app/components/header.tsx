import React from 'react'

import { HeaderMenu } from '@/app/components/header-menu'
import { HeaderTitle } from '@/app/components/header-title'
import { Motion } from '@/components/motion'

import './header.styles.sass'

export const Header: React.FC = () => (
  <header>
    <Motion animation='fade-in-slow' className='header'>
      <HeaderTitle />

      <HeaderMenu />
    </Motion>
  </header>
)
