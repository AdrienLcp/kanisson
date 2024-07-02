import type { Dictionary, I18NStringPath, Locale } from '.'

declare type IPolyglotOptions = {
  phrases: Dictionary
  locale: Locale
}

declare class Polyglot {
  constructor (options: IPolyglotOptions)
  t (key: I18NStringPath, options?: Record<string, string | number>): string
}

export = Polyglot
export = IPolyglotOptions
