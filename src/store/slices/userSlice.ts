// @author Claude Code (claude-sonnet-4-6)

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import Taro from '@tarojs/taro'
import { post } from '@/api/request'
import type { UserInfo, LoginResponse } from '@/types/user'

export const login = createAsyncThunk(
  'user/login',
  async (_, { rejectWithValue }) => {
    try {
      const { code } = await Taro.login()
      const res = await post<LoginResponse>('/auth/login', { code })
      return res.data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const fetchUserInfo = createAsyncThunk(
  'user/fetchUserInfo',
  async (_, { rejectWithValue }) => {
    try {
      const res = await post<UserInfo>('/user/info')
      return res.data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

interface UserState {
  token: string | null
  userInfo: UserInfo | null
  isLogin: boolean
  loading: boolean
}

const initialState: UserState = {
  token: null,
  userInfo: null,
  isLogin: false,
  loading: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null
      state.userInfo = null
      state.isLogin = false
    },
    updateUserInfo: (state, action: PayloadAction<Partial<UserInfo>>) => {
      if (state.userInfo) {
        state.userInfo = { ...state.userInfo, ...action.payload }
      }
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
      state.isLogin = true
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.token = action.payload.token
        state.userInfo = action.payload.userInfo
        state.isLogin = true
      })
      .addCase(login.rejected, (state) => {
        state.loading = false
        state.token = null
        state.userInfo = null
        state.isLogin = false
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.userInfo = action.payload
      })
  },
})

export const { logout, updateUserInfo, setToken } = userSlice.actions
export default userSlice.reducer
