export const RULES = {
  USER: {
    NAME: {
      MIN_LENGTH: 3,
      MAX_LENGTH: 20
    }
  },
  PLAYLIST: {
    TITLE: {
      MIN_LENGTH: 5,
      MAX_LENGTH: 50
    },
    DESCRIPTION: {
      MIN_LENGTH: 5,
      MAX_LENGTH: 200
    }
  },
  TRACK: {
    TITLE: {
      MIN_LENGTH: 2,
      MAX_LENGTH: 50
    },
    ARTIST: {
      MIN_LENGTH: 2,
      MAX_LENGTH: 50
    },
    DEFAULT_START: 30
  }
} as const
