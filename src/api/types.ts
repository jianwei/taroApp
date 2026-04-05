// @author Claude Code (claude-sonnet-4-6)

export interface RequestOptions {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  data?: Record<string, unknown> | unknown
  header?: Record<string, string>
  timeout?: number
  withToken?: boolean
}

export interface ApiResponse<T = unknown> {
  code: number
  data: T
  message: string
}

export interface RequestError {
  code: number
  message: string
  data?: unknown
}
