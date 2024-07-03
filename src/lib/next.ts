import type { Locale } from '@/i18n'

type CommonParams = {
  locale: Locale
}

type Params <T> = T extends null
  ? CommonParams
  : CommonParams & T

export type PageParams <T = null> = {
  params: Params<T>
}

export type PageProps <T = null> = Readonly<PageParams<T>>
export type LayoutProps <T = null> = PageProps<T> & React.PropsWithChildren
