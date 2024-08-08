export const ICON_SETS = [
  {
    name: 'xx',
    icons: [
      'basketball',
      'football',
      'roller',
      'running',
      'skates',
      'skiing',
      'snowboard',
      'tennis',
      'volleyball',
      'walking'
    ]
  }
]

export const ALL_ICONS = ICON_SETS.flatMap(set => set.icons)

export const HABIT_TYPES = {
  TIME: 0,
  CHECK: 1,
  COUNTER: 2
}

export const HABIT_REPEAT_TYPES = {
  DAILY: 0,
  BY_DAYS: 1
}

export const HABIT_ENDING_TYPES = {
  INDEFINITE: 0,
  AFTER_21_DAYS: 1,
  AFTER_100_DAYS: 2,
  ON_DATE: 3
}

export const HABIT_REPEATING_TYPES = {
  TIMES: 0,
  PIECES: 1,
  REPEAT: 2,
  KM: 3
}
