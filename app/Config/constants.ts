export const APP = {
  TITLE: 'Kanisson',
  DEFAULT_DESCRIPTION: 'Blind test games',
} as const

export const HUES = ['neutral', 'blue', 'green', 'orange', 'pink', 'purple', 'red', 'yellow'] as const
export const THEMES = ['system', 'light', 'dark'] as const
export const LOCALES = ['fr', 'en'] as const

export const BREAKPOINTS = [
  {
    screen: 'mobile',
    min: 0,
    max: 480
  },
  {
    screen: 'small',
    min: 481,
    max: 767
  },
  {
    screen: 'tablet',
    min: 768,
    max: 991
  },
  {
    screen: 'laptop',
    min: 992,
    max: 1199
  },
  {
    screen: 'desktop',
    min: 1200,
    max: 1919
  },
  {
    screen: 'large',
    min: 1920
  }
]
