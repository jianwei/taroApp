// @author Claude Code (claude-sonnet-4-6)

import Taro from '@tarojs/taro'

export const storage = {
  async set<T>(key: string, data: T): Promise<void> {
    await Taro.setStorage({ key, data })
  },

  async get<T>(key: string): Promise<T | null> {
    try {
      const { data } = await Taro.getStorage({ key })
      return data as T
    } catch {
      return null
    }
  },

  async remove(key: string): Promise<void> {
    await Taro.removeStorage({ key })
  },

  async clear(): Promise<void> {
    await Taro.clearStorage()
  },

  async getInfo(): Promise<Taro.getStorageInfo.Option> {
    return Taro.getStorageInfo()
  },
}

export const storageSync = {
  set<T>(key: string, data: T): void {
    Taro.setStorageSync(key, data)
  },

  get<T>(key: string): T | undefined {
    return Taro.getStorageSync(key) as T
  },

  remove(key: string): void {
    Taro.removeStorageSync(key)
  },

  clear(): void {
    Taro.clearStorageSync()
  },
}
