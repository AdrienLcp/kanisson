export type DotPrefix<T extends string> = T extends '' ? '' : `.${T}`

export type DotNestedKeys<T> = (
  T extends object ? {
    [K in Exclude<keyof T, symbol>]: `${K}${DotPrefix<DotNestedKeys<T[K]>>}`
  }[Exclude<keyof T, symbol>] : ''
) extends infer D
  ? Extract<D, string>
  : never

export const isValidString = (string: unknown): string is string => {
  return typeof string === 'string' && string.trim().length > 0
}

/**
 * Capitalizes the first letter of the provided sentence.
 * @param sentence - The sentence to capitalize.
 * @returns The sentence with the first letter capitalized, or an empty string if the input is invalid.
 */
export const capitalize = (sentence: string | null | undefined): string => {
  if (!isValidString(sentence)) {
    return ''
  }

  return sentence.charAt(0).toUpperCase() + sentence.slice(1)
}

export const normalizeString = (string: string): string => {
  return string
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

export const getArrayFromStrings = <T extends string> (values: T | T[]): T[] => {
  const array: T[] = []

  if (typeof values === 'string') {
    array.push(values)
  }

  if (Array.isArray(values)) {
    array.push(...values)
  }

  return array
}
