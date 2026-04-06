// @author Claude Code (kimi-k2.5)

import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux'
import userReducer from './slices/userSlice'
import commonReducer from './slices/commonSlice'

console.log('[store/index.ts] Loading store/index.ts')
console.log('[store/index.ts] userReducer:', userReducer)
console.log('[store/index.ts] commonReducer:', commonReducer)

const rootReducer = combineReducers({
  user: userReducer,
  common: commonReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

console.log('[store/index.ts] store created:', store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
