import { HUES, I18N, THEMES } from '@/Config'
import { getDictionary } from '@/I18n'

export type Locale = (typeof I18N)['locales'][number]['key']

type PageParam = {
  lang: Locale
}

export type PageProps = {
  params: PageParam
}

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>

export type FCWithStrings<T = {}> =  React.FC<T & { strings: Dictionary }>

export type Theme = typeof THEMES[number]
export type Hue = typeof HUES[number]
