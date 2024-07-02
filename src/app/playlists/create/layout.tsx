import type { Metadata } from 'next'
import type React from 'react'

import { getCommonMetadata, getMetadataTitle } from '@/app/metadata'
import type { LayoutProps } from '@/lib/next-js'

const commonMetadata = getCommonMetadata()
const title = getMetadataTitle('Crée ton blind test')

export const metadata: Metadata = {
  ...commonMetadata,
  title,
  openGraph: { ...commonMetadata.openGraph, title },
  twitter: { ...commonMetadata.twitter, title }

}

const CreatePlaylistLayout: React.FC<LayoutProps> = ({ children }) => (<>{children}</>)
export default CreatePlaylistLayout
