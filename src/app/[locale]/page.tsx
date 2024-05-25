import React from 'react'

import type { PageProps } from '@/app/[locale]/layout'
import { LocaleSwitcher } from '@/i18n/locale-switcher'
import { HueSwitcher } from '@/theme/hue-switcher'
import { ThemeSwitcher } from '@/theme/theme-switcher'

const Home: React.FC<PageProps> = () => {

  //! Il reste deux problèmes coté serveur :

  //! 1). "locale" ou "dictionary" à passer en props aux server components qui veulent utiliser i18n (pour pouvoir getI18n() avec la bonne locale)
  //! 2). Comment récupérer l'une de ces deux informations ("locale" ou "dictionary") dans une server action (call api, form action, etc...), il nous faut la request ? récup le param ? Comment ?

  return (
    <div>
      <LocaleSwitcher />
      <ThemeSwitcher />
      <HueSwitcher />
    </div>
  )
}

export default Home
