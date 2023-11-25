const LOCAL_STORAGE_KEYS = ['hue'] as const

type LocalStorageKey = typeof LOCAL_STORAGE_KEYS[number]

export const getStoredItem = <T>(key: LocalStorageKey): T | undefined => {
  const value = window.localStorage.getItem(key)

  if (value) {
    try {
      return value === 'undefined' ? undefined : JSON.parse(value ?? '')
    } catch {
      console.warn(`Parsing error for key "${key}"`, { value })
      return undefined
    }
  }
}

export const storeItem = (key: LocalStorageKey, value: unknown) => {
  if (LOCAL_STORAGE_KEYS.includes(key)) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }
}

export const removeStoredItem = (key: LocalStorageKey) => {
  window.localStorage.removeItem(key)
}

export const clearStore = () => window.localStorage.clear()
