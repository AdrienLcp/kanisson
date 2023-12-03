'use client'

import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

import type { Locale } from '@/Types'
import { storeItem } from '@/Helpers'
import { Button, DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/Components'
import { useLocale } from '@/Hooks'
import { I18N } from '@/Config'
import { cn } from '@/Lib'

import styles from './locale-switcher.styles.module.sass'

const LocaleSwitcher: React.FC = () => {
  const pathname = usePathname()
  const { dictionary } = useLocale()
  const strings = dictionary.components.localeSwitcher

  const getRedirectedPathname = (locale: Locale) => {
    if (!pathname) {
      return '/'
    }

    const segments = pathname.split('/')
    segments[1] = locale
    return segments.join('/')
  }

  const selectedLocale = I18N.locales.find(locale => locale.key === pathname.split('/')[1])

  const handleLocaleButtonClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, locale: Locale) => {
    if (selectedLocale?.key === locale) {
      event.preventDefault()
      return
    }

    storeItem('locale', locale)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant='outline' className={styles['dropdown-trigger']}>
          <Image
            alt={`${strings.flagAlt} ${selectedLocale?.label}`}
            src={selectedLocale?.icon || ''}
            width={20}
            height={20}
          />

          {selectedLocale?.label}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className={styles['popover']} align='start'>
        {I18N.locales.map(locale => (
          <DropdownMenuCheckboxItem
            key={locale.key}
            checked={selectedLocale?.key === locale.key}
            className={styles['popover__item']}
          >
            <Link
              href={getRedirectedPathname(locale.key)}
              onClick={(event) => handleLocaleButtonClick(event, locale.key)}
              className={cn(
                styles['popover__item__link'],
                selectedLocale?.key === locale.key && styles['selected']
              )}
            >
              {locale.label}

              <Image
                alt={`${strings.flagAlt} ${locale.label}`}
                src={locale.icon}
                width={20}
                height={20}
              />
            </Link>
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>      
    </DropdownMenu>
  )
}

export default LocaleSwitcher
