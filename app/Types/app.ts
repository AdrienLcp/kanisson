import { I18N } from '@/Config'

export type Locale = (typeof I18N)['locales'][number]

type PageParam = {
  lang: Locale
}

export type PageProps = {
  params: PageParam
}
