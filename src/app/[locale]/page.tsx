import React from 'react'

import type { PageProps } from '@/app/[locale]/layout'
// import { LocaleSwitcher } from '@/i18n/locale-switcher'
// import { HueSwitcher } from '@/theme/hue-switcher'
// import { ThemeSwitcher } from '@/theme/theme-switcher'
// import { Button } from '@/components/button'

import './page.styles.sass'
import { LoginButton } from '@/auth/login-button'

const Home: React.FC<PageProps> = async () => {
  //! Il reste deux problèmes coté serveur :

  //! 1). "locale" ou "dictionary" à passer en props aux server components qui veulent utiliser i18n (pour pouvoir getI18n() avec la bonne locale)
  //! 2). Comment récupérer l'une de ces deux informations ("locale" ou "dictionary") dans une server action (call api, form action, etc...), il nous faut la request ? récup le param ? Comment ?

  return (
    <div>
      {/* <LocaleSwitcher />
      <ThemeSwitcher />
      <HueSwitcher /> */}

      <div style={{ padding: 50 }}>

        <p className='test-font-1'>
          Typography testing
        </p>

        <p className='test-font-2'>
          Typography testing
        </p>

        <p className='test-font-3'>
          Typography testing
        </p>

        <p className='test-font-4'>
          Typography testing
        </p>

        <p className='test-font-5'>
          Typography testing
        </p>

        <p className='test-font-6'>
          Typography testing
        </p>

        <p className='test-font-7'>
          Typography testing
        </p>

        <p className='test-font-8'>
          Typography testing
        </p>

        <p className='test-font-9'>
          Typography testing
        </p>

        <p className='test-font-10'>
          Typography testing
        </p>

        <p className='test-font-11'>
          Typography testing
        </p>

        <p className='test-font-12'>
          Typography testing
        </p>

        <p className='test-font-13'>
          Typography testing
        </p>

        <p className='test-font-14'>
          Typography testing
        </p>

        <p className='test-font-15'>
          Typography testing
        </p>

        <LoginButton />
      </div>
    </div>
  )
}

export default Home
