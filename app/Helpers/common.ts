export const copyToClipboard = async (text: string): Promise<boolean> => {
  if (!navigator?.clipboard) {
    console.warn('Clipboard not supported')
    return false
  }

  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (error) {
    console.warn(`Failed to copy "${text}"`, error)
    return false
  }
}

export const getRandomNumber = (max: number = 100, min: number = 0): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const getSortedArray = <T>(array: T[], prop: keyof T, type: 'asc' | 'desc' = 'asc'): T[] => {
  return array.toSorted((a, b) => {
    const valueA = type === 'asc' ? a[prop] : b[prop]
    const valueB = type === 'asc' ? b[prop] : a[prop]

    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return valueA - valueB
    }

    if (valueA instanceof Date && valueB instanceof Date) {
      return valueA.getTime() - valueB.getTime()
    }
    
    return String(valueA).localeCompare(String(valueB))
  })
}
