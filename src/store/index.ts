// @author Claude Code (claude-sonnet-4-6)

import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import userReducer from './slices/userSlice'
import commonReducer from './slices/commonSlice'
import { TaroStorage } from './storage/taro-storage'

const persistConfig = {
  key: 'root',
  storage: TaroStorage,
  whitelist: ['user'],
}

const rootReducer = combineReducers({
  user: userReducer,
  common: commonReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
