import type { Metadata } from 'next'

import { LOCALES, type I18n, type Locale } from '@/i18n'

const title = 'Kanisson - Site de blind test'
const shortName = 'Kanisson'
const description = 'Jouez, créez et partagez des blind tests en ligne !'
const baseUrl = 'https://www.kanisson.com'
const creatorName = 'Adrien Lacourpaille'

export const getCommonMetadata = (): Metadata => {
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
      'quiz musical',
      'jeu',
      'musique',
      'quiz',
      'chanson',
      'bande son'
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
    category: 'Jeu',
    classification: 'Jeu en ligne',
    openGraph: {
      determiner: '',
      type: 'website',
      url: baseUrl,
      title: title,
      description: description,
      siteName: shortName,
      emails: ['kanisson@gmail.com'],
      locale: 'fr',
      images: [], // TODO
      countryName: 'France',
      alternateLocale: ['en']
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

export const getCommonLocalizedMetadata = (currentLocale: Locale, i18n: I18n): Metadata => {
  const commonMetadata = getCommonMetadata()

  const shortName = i18n('metadata.short-name')
  const description = i18n('metadata.description')
  const title = i18n('metadata.name')

  const localizedMetadata: Metadata = {
    ...commonMetadata,
    title,
    description,
    applicationName: shortName,
    category: i18n('metadata.category'),
    classification: i18n('metadata.classification'),
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
    openGraph: {
      ...commonMetadata.openGraph,
      title,
      description,
      siteName: shortName,
      locale: currentLocale,
      alternateLocale: [...LOCALES.filter(locale => locale !== currentLocale)]
    },
    twitter: {
      title: title,
      description: description
    }
  }

  return localizedMetadata
}

export const getLocalizedMetadataTitle = (i18n: I18n, title: string): string => {
  return `${title} ${i18n('metadata.suffix-title')}`
}
