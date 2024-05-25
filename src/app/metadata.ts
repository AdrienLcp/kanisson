import type { Metadata } from 'next'

import { getValidLocale, type Locale } from '@/i18n'
import { getI18n } from '@/i18n/server'
import { env } from '@/env'

const baseUrl = env.NEXT_PUBLIC_BASE_URL

export const getCommonMetadata = async (currentLocale?: Locale): Promise<Metadata> => {
  const locale = getValidLocale(currentLocale)
  const i18n = await getI18n(locale)

  const shortName = i18n('metadata.short-name')
  const description = i18n('metadata.description')
  const creatorName = 'Adrien Lacourpaille'
  const title: Metadata['title'] = {
    default: shortName,
    template: `%s | ${i18n('metadata.short-description')}`
  }

  const commonMetadata: Metadata = {
    metadataBase: new URL(baseUrl),
    title: title,
    description: description,
    applicationName: shortName,
    authors: [
      {
        name: creatorName,
        url: 'https://www.adrienlacourpaille.com'
      }
    ],
    generator: 'Next.js',
    publisher: 'Vercel',
    referrer: 'origin',
    keywords: [
      i18n('metadata.keywords.blind-test'),
      i18n('metadata.keywords.game'),
      i18n('metadata.keywords.music'),
      i18n('metadata.keywords.quiz'),
      i18n('metadata.keywords.song'),
      i18n('metadata.keywords.sound'),
      i18n('metadata.keywords.soundtrack'),
      i18n('metadata.keywords.track')
    ],
    creator: creatorName,
    robots: {
      follow: true,
      index: true
    },
    icons: [], // TODO
    assets: [], // TODO
    formatDetection: {
      telephone: true,
      date: true,
      address: true,
      email: true,
      url: true
    },
    category: i18n('metadata.category'),
    classification: i18n('metadata.classification'),
    openGraph: {
      determiner: '',
      type: 'website',
      url: baseUrl,
      title: title,
      description: description,
      siteName: shortName,
      emails: ['kanisson@gmail.com'],
      locale: locale,
      images: [], // TODO
      countryName: i18n('metadata.open-graph.country-name'),
      alternateLocale: [
        i18n('metadata.open-graph.alternate-locales.0')
      ]
    },
    twitter: {
      card: 'summary',
      title: title,
      description: description,
      images: [] // TODO
    }
  }

  return commonMetadata
}
