import type { Metadata } from 'next'

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

export const getMetadataTitle = (title: string): string => {
  return `${title} • Kanisson - Site de blind test`
}
