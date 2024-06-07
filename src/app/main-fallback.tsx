import React from 'react'

import { Loader } from '@/components/loader'

import './main-fallback.styles.sass'

export const MainFallback: React.FC = () => (
  <div className='main-fallback'>
    main loading...
    <Loader size='large' />
  </div>
)
