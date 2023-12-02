'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

import type { Locale } from '@/Types'
import { storeItem } from '@/Helpers'
import { I18N } from '@/Config'

import styles from './locale-switcher.styles.module.sass'

const LocaleSwitcher: React.FC = () => {
  const pathname = usePathname()

  const getRedirectedPathname = (locale: Locale) => {
    if (!pathname) {
      return '/'
    }

    const segments = pathname.split('/')
    segments[1] = locale
    return segments.join('/')
  }

  const handleLocaleButtonClick = (locale: Locale) => {
    storeItem('locale', locale)
  }

  return (
    <ul className={styles['locale-switcher']}>
      {I18N.locales.map(locale => (
        <li key={locale.key}>
          <Link
            href={getRedirectedPathname(locale.key)}
            onClick={() => handleLocaleButtonClick(locale.key)}
            className={styles['locale-switcher__link']}
          >
            {locale.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default LocaleSwitcher
