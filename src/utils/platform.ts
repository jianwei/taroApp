// @author Claude Code (claude-sonnet-4-6)

export const TARO_ENV = process.env.TARO_ENV
export const isWeapp = TARO_ENV === 'weapp'
export const isH5 = TARO_ENV === 'h5'
export const isRN = TARO_ENV === 'rn'
export const isHarmony = TARO_ENV === 'harmony'
export const isWeb = isH5
export const isNative = isWeapp || isRN || isHarmony

export function getPlatformName(): string {
  const platformMap: Record<string, string> = {
    weapp: '微信小程序',
    h5: 'H5',
    rn: 'APP',
    harmony: '鸿蒙',
  }
  return platformMap[TARO_ENV || ''] || '未知平台'
}

export function platformHandler<T>(
  platformHandlers: {
    weapp?: () => T
    h5?: () => T
    rn?: () => T
    harmony?: () => T
  },
  defaultHandler?: () => T
): T | undefined {
  const handler = platformHandlers[TARO_ENV as keyof typeof platformHandlers]
  if (handler) {
    return handler()
  }
  return defaultHandler?.()
}
