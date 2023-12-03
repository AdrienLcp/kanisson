'use client'

import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'

import type { Locale } from '@/Types'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components'
import { getRedirectedPathname, storeItem } from '@/Helpers'
import { useLocale } from '@/Hooks'
import { I18N } from '@/Config'

import styles from './locale-switcher.styles.module.sass'

const LocaleSwitcher: React.FC = () => {
  const pathname = usePathname()
  const router = useRouter()

  const { dictionary } = useLocale()
  const strings = dictionary.components.localeSwitcher

  const selectedLocale = I18N.locales.find(locale => locale.key === pathname.split('/')[1])

  const handleLocaleSelectionChange = (localeKey: Locale) => {
    if (I18N.locales.some(locale => locale.key === localeKey)) {
      const newPath = getRedirectedPathname(pathname, localeKey)
      
      if (newPath !== pathname) {
        storeItem('locale', localeKey)
        router.push(newPath)
      }
    }
  }

  return (
    <Select
      defaultValue={selectedLocale?.key}
      onValueChange={handleLocaleSelectionChange}
    >
      <SelectTrigger>
        <SelectValue placeholder={strings.placeholder} />
      </SelectTrigger>

      <SelectContent align='start'>
        {I18N.locales.map(locale => (
          <SelectItem key={locale.key} value={locale.key}>
            <div className={styles['option']}>
              <Image
                alt={`${strings.flagAlt} ${locale.label}`}
                src={locale.icon}
                width={20}
                height={20}
              />

              {locale.label}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default LocaleSwitcher
