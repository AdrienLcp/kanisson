import React from 'react'

import { PageWrapper } from '@/app/components/page-wrapper'
import type { PageProps } from '@/app/types'
import { buildI18n } from '@/i18n'
import { LocaleSwitcher } from '@/i18n/components/locale-switcher'
import { getDictionary } from '@/i18n/server'
import { HueSwitcher } from '@/theme/hue-switcher'
import { ThemeSwitcher } from '@/theme/theme-switcher'

import './page.styles.sass'

const SettingsPage: React.FC<PageProps> = async ({ params }) => {
  const locale = params.locale

  const dictionary = await getDictionary(locale)
  const i18n = buildI18n(dictionary, locale)

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
