// @author Claude Code (claude-sonnet-4-6)

export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER_INFO: 'user_info',
  SETTINGS: 'settings',
  SEARCH_HISTORY: 'search_history',
  CART_DATA: 'cart_data',
} as const

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 20, 50],
  MAX_PAGE_SIZE: 100,
} as const

export const REQUEST_CONFIG = {
  TIMEOUT: 30000,
  RETRY_COUNT: 3,
  RETRY_DELAY: 1000,
} as const

export const REGEX = {
  PHONE: /^1[3-9]\d{9}$/,
  EMAIL: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/,
  ID_CARD: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
  URL: /^https?:\/\/.+/,
} as const

export const DEFAULTS = {
  AVATAR: 'https://placeholder.com/avatar.png',
  NICKNAME: '用户',
} as const
