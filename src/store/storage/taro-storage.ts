// @author Claude Code (claude-sonnet-4-6)

import Taro from '@tarojs/taro'
import type { Storage } from 'redux-persist'

export const TaroStorage: Storage = {
  getItem: (key: string) =>
    Taro.getStorage({ key })
      .then((res) => res.data)
      .catch(() => null),

  setItem: (key: string, value: unknown) =>
    Taro.setStorage({ key, data: value }),

  removeItem: (key: string) =>
    Taro.removeStorage({ key }),
}
