const LOCAL_STORAGE_KEYS = ['locale', 'token'] as const

type LocalStorageKey = typeof LOCAL_STORAGE_KEYS[number]

export const getLocalStorageItem = <T>(key: LocalStorageKey): T | undefined => {
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

export const setLocalStorageItem = (key: LocalStorageKey, value: unknown) => {
  if (LOCAL_STORAGE_KEYS.includes(key)) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }
}

export const removeLocalStorageItem = (key: LocalStorageKey) => {
  window.localStorage.removeItem(key)
}

export const clearLocalStorage = () => window.localStorage.clear()
