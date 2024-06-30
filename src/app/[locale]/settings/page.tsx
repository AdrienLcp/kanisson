import type { Metadata } from 'next'
import React from 'react'

import { PageWrapper } from '@/app/components/page-wrapper'
import { getCommonMetadata, getMetadataTitle } from '@/app/metadata'
import { LocaleSwitcher } from '@/i18n/components/locale-switcher'
import { getI18n } from '@/i18n/server'
import type { PageProps } from '@/lib/next-js'
import { HueSwitcher } from '@/theme/hue-switcher'
import { ThemeSwitcher } from '@/theme/theme-switcher'

import './page.styles.sass'

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const locale = params.locale
  const i18n = await getI18n(locale)

  const commonMetadata = await getCommonMetadata(i18n, locale)
  const title = getMetadataTitle(i18n, i18n('routes.settings.metadata-title'))

  return {
    ...commonMetadata,
    title,
    openGraph: { ...commonMetadata.openGraph, title },
    twitter: { ...commonMetadata.twitter, title }
  }
}

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
