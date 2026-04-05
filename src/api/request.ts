// @author Claude Code (claude-sonnet-4-6)

import Taro from '@tarojs/taro'
import { store } from '@/store'
import { REQUEST_CONFIG } from '@/constants'
import type { RequestOptions, ApiResponse, RequestError } from './types'

const BASE_URL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3000/api'
  : 'https://api.example.com/api'

function requestInterceptor(options: RequestOptions): RequestOptions {
  const { withToken = true } = options
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.header,
  }

  if (withToken) {
    const { token } = store.getState().user
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }
  }

  return {
    ...options,
    header: headers,
  }
}

function responseInterceptor<T>(response: Taro.request.SuccessCallbackResult<T>): T {
  const { statusCode, data } = response

  if (statusCode >= 200 && statusCode < 300) {
    return data as T
  }

  throw {
    code: statusCode,
    message: '请求失败',
    data,
  } as RequestError
}

function errorHandler(error: unknown): never {
  let message = '网络错误，请稍后重试'
  let code = -1

  if (typeof error === 'object' && error !== null) {
    const err = error as RequestError
    message = err.message || message
    code = err.code || code
  }

  Taro.showToast({
    title: message,
    icon: 'none',
    duration: 2000,
  })

  throw { code, message } as RequestError
}

export async function request<T = unknown>(
  options: RequestOptions
): Promise<ApiResponse<T>> {
  const finalOptions = requestInterceptor(options)

  try {
    const response = await Taro.request({
      url: `${BASE_URL}${finalOptions.url}`,
      method: finalOptions.method || 'GET',
      data: finalOptions.data,
      header: finalOptions.header,
      timeout: finalOptions.timeout || REQUEST_CONFIG.TIMEOUT,
    })

    return responseInterceptor(response)
  } catch (error) {
    return errorHandler(error)
  }
}

export function get<T = unknown>(
  url: string,
  params?: Record<string, unknown>,
  options?: Omit<RequestOptions, 'url' | 'method' | 'data'>
): Promise<ApiResponse<T>> {
  return request<T>({
    url,
    method: 'GET',
    data: params,
    ...options,
  })
}

export function post<T = unknown>(
  url: string,
  data?: Record<string, unknown>,
  options?: Omit<RequestOptions, 'url' | 'method' | 'data'>
): Promise<ApiResponse<T>> {
  return request<T>({
    url,
    method: 'POST',
    data,
    ...options,
  })
}

export function put<T = unknown>(
  url: string,
  data?: Record<string, unknown>,
  options?: Omit<RequestOptions, 'url' | 'method' | 'data'>
): Promise<ApiResponse<T>> {
  return request<T>({
    url,
    method: 'PUT',
    data,
    ...options,
  })
}

export function del<T = unknown>(
  url: string,
  options?: Omit<RequestOptions, 'url' | 'method'>
): Promise<ApiResponse<T>> {
  return request<T>({
    url,
    method: 'DELETE',
    ...options,
  })
}
