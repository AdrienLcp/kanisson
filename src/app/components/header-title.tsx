'use client'

import React from 'react'

import { useI18n } from '@/i18n'

import './header-title.styles.sass'

export const HeaderTitle: React.FC = () => {
  const { i18n } = useI18n()

  return (
    <h1 className='header-title'>
      {i18n('app.name')}
    </h1>
  )
}
