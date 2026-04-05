// @author Claude Code (claude-sonnet-4-6)

export interface UserInfo {
  id: string
  nickname: string
  avatar: string
  phone?: string
  email?: string
  gender?: 0 | 1 | 2
  birthday?: string
  address?: string
  createTime?: string
  updateTime?: string
}

export interface LoginResponse {
  token: string
  userInfo: UserInfo
  expiresIn: number
}

export interface UpdateUserParams {
  nickname?: string
  avatar?: string
  phone?: string
  email?: string
  gender?: 0 | 1 | 2
  birthday?: string
  address?: string
}
