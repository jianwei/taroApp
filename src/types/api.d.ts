// @author Claude Code (claude-sonnet-4-6)

import { ApiResponse } from './global'

// 请求方法
export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

// 请求配置
export interface RequestConfig {
  url: string
  method?: RequestMethod
  data?: Record<string, unknown> | unknown
  params?: Record<string, unknown>
  headers?: Record<string, string>
  timeout?: number
  withToken?: boolean
}

// 登录请求
export interface LoginRequest {
  code: string
  encryptedData?: string
  iv?: string
}

// 通用列表请求
export interface ListRequest {
  page?: number
  pageSize?: number
  keyword?: string
  sort?: string
  order?: 'asc' | 'desc'
}

export type { ApiResponse }
