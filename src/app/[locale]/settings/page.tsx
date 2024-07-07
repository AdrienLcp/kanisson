import React from 'react'

import { PageWrapper } from '@/app/components/page-wrapper'
import { LocaleSwitcher } from '@/i18n/locale-switcher'
import { PlayerVolume } from '@/player/components/player-volume'
import { HueSwitcher } from '@/theme/hue-switcher'
import { ThemeSwitcher } from '@/theme/theme-switcher'

import './page.styles.sass'

const SettingsPage: React.FC = () => (
  <PageWrapper titleRouteKey='settings'>
    <div className='settings-page'>
      <PlayerVolume />

      <LocaleSwitcher />

      <ThemeSwitcher />

      <HueSwitcher />
    </div>
  </PageWrapper>
)

export default SettingsPage
