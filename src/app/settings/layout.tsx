import type { Metadata } from 'next'
import React from 'react'

import { getCommonMetadata, getMetadataTitle } from '@/app/metadata'

const commonMetadata = getCommonMetadata()
const settingsPageTitle = getMetadataTitle('Paramètres du site')

export const metadata: Metadata = {
  ...commonMetadata,
  title: settingsPageTitle,
  openGraph: { ...commonMetadata.openGraph, title: settingsPageTitle },
  twitter: { ...commonMetadata.twitter, title: settingsPageTitle }
}

const SettingsLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      {children}
    </>
  )
}

export default SettingsLayout
