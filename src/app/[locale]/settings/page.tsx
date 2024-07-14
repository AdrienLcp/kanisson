import React from 'react'

import { PageWrapper } from '@/app/components/page-wrapper'
import { LocaleSwitcher } from '@/i18n/locale-switcher'
import { PlayerVolume } from '@/player/components/player-volume'
import { HueSwitcher } from '@/theme/hue-switcher'
import { ThemeSwitcher } from '@/theme/theme-switcher'

import './page.styles.sass'

const SettingsPage: React.FC = () => (
  <PageWrapper
    className='settings-page'
    titleRouteKey='settings'
  >
    <PlayerVolume isHorizontal />

    <LocaleSwitcher />

    <ThemeSwitcher />

    <HueSwitcher />
  </PageWrapper>
)

export default SettingsPage
