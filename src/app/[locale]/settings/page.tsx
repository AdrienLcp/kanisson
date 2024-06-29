import React from 'react'

import { PageWrapper } from '@/app/components/page-wrapper'
import type { PageProps } from '@/helpers/next-js'
import { LocaleSwitcher } from '@/i18n/components/locale-switcher'
import { getI18n } from '@/i18n/server'
import { HueSwitcher } from '@/theme/hue-switcher'
import { ThemeSwitcher } from '@/theme/theme-switcher'

import './page.styles.sass'

const SettingsPage: React.FC<PageProps> = async ({ params }) => {
  const locale = params.locale
  const i18n = await getI18n(locale)

  return (
    <PageWrapper title={i18n('routes.settings.page-title')}>
      <div className='settings-page'>
        <LocaleSwitcher />

        <ThemeSwitcher />

        <HueSwitcher />
      </div>
    </PageWrapper>
  )
}

export default SettingsPage
