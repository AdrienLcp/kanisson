import { getDictionary } from '@/Helpers'
import { I18N } from '@/Config'

export type Locale = (typeof I18N)['locales'][number]['key']

type PageParam = {
  lang: Locale
}

export type PageProps = {
  params: PageParam
}

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>
