// @author Claude Code (kimi-k2.5)

import AsyncStorage from '@react-native-async-storage/async-storage'
import type { Storage } from 'redux-persist'

export const TaroStorage: Storage = {
  getItem: (key: string) =>
    AsyncStorage.getItem(key).then((value) => value ? JSON.parse(value) : null),

  setItem: (key: string, value: unknown) =>
    AsyncStorage.setItem(key, JSON.stringify(value)),

  removeItem: (key: string) =>
    AsyncStorage.removeItem(key),
}
