// @author Claude Code (claude-sonnet-4-6)

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import Taro from '@tarojs/taro'
import type { SystemInfo, LocationInfo } from '@/types/global'

export const fetchSystemInfo = createAsyncThunk(
  'common/fetchSystemInfo',
  async () => {
    const res = await Taro.getSystemInfo()
    return res as SystemInfo
  }
)

export const fetchLocation = createAsyncThunk(
  'common/fetchLocation',
  async () => {
    const res = await Taro.getLocation({
      type: 'gcj02',
    })
    return res as LocationInfo
  }
)

interface CommonState {
  systemInfo: SystemInfo | null
  location: LocationInfo | null
  networkStatus: 'online' | 'offline'
  loading: boolean
}

const initialState: CommonState = {
  systemInfo: null,
  location: null,
  networkStatus: 'online',
  loading: false,
}

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setNetworkStatus: (state, action: PayloadAction<'online' | 'offline'>) => {
      state.networkStatus = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSystemInfo.fulfilled, (state, action) => {
        state.systemInfo = action.payload
      })
      .addCase(fetchLocation.fulfilled, (state, action) => {
        state.location = action.payload
      })
  },
})

export const { setNetworkStatus, setLoading } = commonSlice.actions
export default commonSlice.reducer
