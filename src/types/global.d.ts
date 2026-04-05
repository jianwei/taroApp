// @author Claude Code (claude-sonnet-4-6)

// 系统信息
export interface SystemInfo {
  brand: string
  model: string
  system: string
  version: string
  SDKVersion: string
  screenWidth: number
  screenHeight: number
  windowWidth: number
  windowHeight: number
  statusBarHeight: number
  platform: string
  safeArea?: {
    left: number
    right: number
    top: number
    bottom: number
    width: number
    height: number
  }
}

// 位置信息
export interface LocationInfo {
  latitude: number
  longitude: number
  speed?: number
  accuracy?: number
  altitude?: number
  verticalAccuracy?: number
  horizontalAccuracy?: number
}

// 通用响应
export interface ApiResponse<T = unknown> {
  code: number
  data: T
  message: string
}

// 分页参数
export interface PaginationParams {
  page: number
  pageSize: number
}

// 分页响应
export interface PaginationData<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}
