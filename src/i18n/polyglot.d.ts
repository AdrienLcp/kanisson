import type { Dictionary, I18NStringPaths, Locale } from '.'

declare type IPolyglotOptions = {
  phrases: Dictionary
  locale: Locale
}

declare class Polyglot {
  constructor (options: IPolyglotOptions)
  t (key: I18NStringPaths, options?: Record<string, string | number>): string
}

export = Polyglot
export = IPolyglotOptions
