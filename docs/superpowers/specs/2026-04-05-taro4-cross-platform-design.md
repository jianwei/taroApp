# Taro 4 四端统一项目设计文档

## @author Claude Code (claude-sonnet-4-6)

---

## 1. 项目概述

### 1.1 目标
构建一套代码，同时支持：
- 微信小程序
- H5
- APP (React Native)
- 鸿蒙 (HarmonyOS NEXT)

### 1.2 技术选型

| 层面 | 技术栈 | 版本 |
|------|--------|------|
| 跨端框架 | Taro | 4.0+ |
| 开发语言 | TypeScript | 5.0+ |
| UI 组件库 | Taro UI | 3.x |
| 状态管理 | Redux Toolkit | 2.x |
| 路由 | Taro Router | 内置 |
| 构建工具 | Webpack5 | - |
| 包管理器 | pnpm | 8.x |

---

## 2. 架构设计

### 2.1 整体架构图

```
┌─────────────────────────────────────────────────────────────────┐
│                        应用层 (Application)                      │
│  ┌─────────────┬─────────────┬─────────────┬─────────────────┐  │
│  │  微信小程序  │     H5      │   APP (RN)  │    鸿蒙          │  │
│  │             │             │             │                 │  │
│  │  微信原生    │  Web 渲染   │  RN 原生    │  ArkUI 原生     │  │
│  │  组件       │             │  组件       │  组件           │  │
│  └─────────────┴─────────────┴─────────────┴─────────────────┘  │
├─────────────────────────────────────────────────────────────────┤
│                        业务层 (Business)                         │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Pages (页面)                                            │   │
│  │  Components (组件)                                       │   │
│  │  Hooks (业务逻辑)                                        │   │
│  └─────────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────────┤
│                        状态层 (State)                            │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Redux Store                                             │   │
│  │  ├── Slices (用户/购物车/通用)                           │   │
│  │  ├── Async Thunks (异步操作)                             │   │
│  │  └── Persistence (状态持久化)                            │   │
│  └─────────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────────┤
│                        基础设施层 (Infrastructure)               │
│  ┌─────────────┬─────────────┬─────────────┬─────────────────┐  │
│  │   API 请求   │  工具函数    │   常量定义   │   类型定义      │  │
│  │   Taro.request          封装           │   TypeScript    │  │
│  └─────────────┴─────────────┴─────────────┴─────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 目录结构

```
my-app/
├── .vscode/                    # VSCode 配置
├── config/                     # Taro 构建配置
│   ├── index.js               # 基础配置
│   ├── dev.js                 # 开发环境
│   ├── prod.js                # 生产环境
│   ├── weapp.js               # 小程序配置
│   ├── h5.js                  # H5 配置
│   ├── rn.js                  # RN 配置
│   └── harmony.js             # 鸿蒙配置
├── src/
│   ├── app.tsx                # 应用入口
│   ├── app.config.ts          # 应用配置
│   ├── app.scss               # 全局样式
│   ├── index.html             # H5 模板
│   ├── api/                   # API 请求
│   │   ├── request.ts         # 请求封装
│   │   ├── user.ts            # 用户相关 API
│   │   └── types.ts           # API 类型定义
│   ├── components/            # 公共组件
│   │   ├── Loading/           # 加载组件
│   │   ├── Empty/             # 空状态组件
│   │   └── Auth/              # 授权组件
│   ├── constants/             # 常量定义
│   │   ├── index.ts
│   │   └── storage.ts         # 存储 key
│   ├── hooks/                 # 自定义 Hooks
│   │   ├── useUser.ts         # 用户相关
│   │   ├── useSystemInfo.ts   # 系统信息
│   │   └── usePageScroll.ts   # 页面滚动
│   ├── pages/                 # 页面
│   │   ├── index/
│   │   │   ├── index.tsx
│   │   │   ├── index.config.ts
│   │   │   └── index.scss
│   │   └── profile/
│   │       ├── index.tsx
│   │       ├── index.config.ts
│   │       └── index.scss
│   ├── store/                 # Redux 状态管理
│   │   ├── index.ts           # Store 配置
│   │   ├── hooks.ts           # Typed hooks
│   │   ├── storage/           # 持久化存储适配
│   │   │   └── taro-storage.ts
│   │   ├── slices/            # State slices
│   │   │   ├── userSlice.ts
│   │   │   ├── cartSlice.ts
│   │   │   └── commonSlice.ts
│   │   └── selectors/         # 派生选择器
│   │       └── userSelectors.ts
│   ├── types/                 # 全局类型定义
│   │   ├── global.d.ts
│   │   ├── user.d.ts
│   │   └── api.d.ts
│   ├── utils/                 # 工具函数
│   │   ├── index.ts
│   │   ├── platform.ts        # 平台判断
│   │   ├── storage.ts         # 存储封装
│   │   ├── validate.ts        # 验证函数
│   │   └── format.ts          # 格式化函数
│   └── styles/                # 全局样式
│       ├── variables.scss     # SCSS 变量
│       ├── mixins.scss        # SCSS mixins
│       └── common.scss        # 公共样式
├── types/                     # 项目级类型
│   └── taro-ui.d.ts
├── scripts/                   # 构建脚本
│   └── build-check.sh
├── babel.config.js
├── tsconfig.json
├── package.json
└── pnpm-workspace.yaml
```

---

## 3. 状态管理设计

### 3.1 Redux Store 结构

```typescript
// 全局 State 结构
interface RootState {
  user: {
    token: string | null
    userInfo: UserInfo | null
    isLogin: boolean
    loading: boolean
  }
  cart: {
    items: CartItem[]
    selectedIds: string[]
    totalAmount: number
    totalCount: number
  }
  common: {
    systemInfo: SystemInfo | null
    networkStatus: 'online' | 'offline'
    location: LocationInfo | null
  }
}
```

### 3.2 Store 配置

```typescript
// store/index.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import userReducer from './slices/userSlice'
import cartReducer from './slices/cartSlice'
import commonReducer from './slices/commonSlice'
import { TaroStorage } from './storage/taro-storage'

const persistConfig = {
  key: 'root',
  storage: TaroStorage,
  whitelist: ['user', 'cart'],
}

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
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

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
```

### 3.3 Taro 存储适配

```typescript
// store/storage/taro-storage.ts
import Taro from '@tarojs/taro'
import { Storage } from 'redux-persist'

export const TaroStorage: Storage = {
  getItem: (key: string) =>
    Taro.getStorage({ key })
      .then((res) => res.data)
      .catch(() => null),

  setItem: (key: string, value: unknown) =>
    Taro.setStorage({ key, data: value }),

  removeItem: (key: string) =>
    Taro.removeStorage({ key }),
}
```

### 3.4 Slice 示例

```typescript
// store/slices/userSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import Taro from '@tarojs/taro'
import { request } from '@/api/request'

export const login = createAsyncThunk(
  'user/login',
  async (_, { rejectWithValue }) => {
    try {
      const { code } = await Taro.login()
      const res = await request({
        url: '/api/login',
        method: 'POST',
        data: { code },
      })
      return res.data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const getUserInfo = createAsyncThunk(
  'user/getUserInfo',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { user } = getState() as RootState
      const res = await request({
        url: '/api/user/info',
        header: { Authorization: `Bearer ${user.token}` },
      })
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.token = action.payload.token
        state.isLogin = true
      })
      .addCase(login.rejected, (state) => {
        state.loading = false
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.userInfo = action.payload
      })
  },
})

export const { logout, updateUserInfo } = userSlice.actions
export default userSlice.reducer
```

---

## 4. 平台差异处理

### 4.1 平台判断工具

```typescript
// utils/platform.ts
export const isWeapp = process.env.TARO_ENV === 'weapp'
export const isH5 = process.env.TARO_ENV === 'h5'
export const isRN = process.env.TARO_ENV === 'rn'
export const isHarmony = process.env.TARO_ENV === 'harmony'

export const isWeb = isH5
export const isNative = isWeapp || isRN || isHarmony

// 条件编译宏（编译时处理）
// #ifdef weapp
// #ifdef h5
// #ifdef rn
// #ifdef harmony
```

### 4.2 API 请求封装

```typescript
// api/request.ts
import Taro from '@tarojs/taro'
import { store } from '@/store'

interface RequestOptions {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  data?: Record<string, unknown>
  header?: Record<string, string>
}

export const request = async (options: RequestOptions) => {
  const { token } = store.getState().user

  const defaultHeader: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  if (token) {
    defaultHeader.Authorization = `Bearer ${token}`
  }

  try {
    const res = await Taro.request({
      url: `${BASE_URL}${options.url}`,
      method: options.method || 'GET',
      data: options.data,
      header: { ...defaultHeader, ...options.header },
    })

    if (res.statusCode >= 200 && res.statusCode < 300) {
      return res.data
    }

    throw new Error(res.data?.message || '请求失败')
  } catch (error) {
    // 统一错误处理
    Taro.showToast({
      title: error.message || '网络错误',
      icon: 'none',
    })
    throw error
  }
}
```

### 4.3 存储封装

```typescript
// utils/storage.ts
import Taro from '@tarojs/taro'

export const storage = {
  set: async (key: string, data: unknown) => {
    await Taro.setStorage({ key, data })
  },

  get: async <T>(key: string): Promise<T | null> => {
    try {
      const { data } = await Taro.getStorage({ key })
      return data as T
    } catch {
      return null
    }
  },

  remove: async (key: string) => {
    await Taro.removeStorage({ key })
  },

  clear: async () => {
    await Taro.clearStorage()
  },
}
```

---

## 5. UI 设计

### 5.1 Taro UI 使用

```typescript
// app.tsx
import 'taro-ui/dist/style/index.scss'
import './app.scss'

function App({ children }) {
  return children
}

export default App
```

### 5.2 页面示例

```typescript
// pages/index/index.tsx
import { View } from '@tarojs/components'
import { AtButton, AtList, AtListItem, AtToast } from 'taro-ui'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/store'
import { login, logout } from '@/store/slices/userSlice'

export default function Index() {
  const [toastOpen, setToastOpen] = useState(false)
  const dispatch = useAppDispatch()
  const { isLogin, userInfo, loading } = useAppSelector((state) => state.user)

  const handleLogin = async () => {
    try {
      await dispatch(login()).unwrap()
      setToastOpen(true)
    } catch (error) {
      console.error('登录失败', error)
    }
  }

  return (
    <View className='index-page'>
      {isLogin ? (
        <AtList>
          <AtListItem
            title='昵称'
            extraText={userInfo?.nickname || '-'}
          />
          <AtListItem
            title='手机号'
            extraText={userInfo?.phone || '-'}
          />
        </AtList>
      ) : (
        <AtButton
          type='primary'
          loading={loading}
          onClick={handleLogin}
        >
          微信登录
        </AtButton>
      )}

      <AtToast
        isOpened={toastOpen}
        text='登录成功'
        onClose={() => setToastOpen(false)}
      />
    </View>
  )
}
```

### 5.3 全局样式变量

```scss
// src/styles/variables.scss

// 主色调
$primary-color: #6190e8;
$primary-color-light: #78a4f6;
$primary-color-dark: #346fc2;

// 文字色
$text-color: #333;
$text-color-secondary: #666;
$text-color-light: #999;

// 背景色
$bg-color: #f5f5f5;
$bg-color-white: #fff;

// 边框色
$border-color: #e5e5e5;

// 字体大小
$font-size-xs: 20px;
$font-size-sm: 24px;
$font-size-base: 28px;
$font-size-lg: 32px;
$font-size-xl: 36px;

// 间距
$spacing-xs: 8px;
$spacing-sm: 16px;
$spacing-base: 24px;
$spacing-lg: 32px;
$spacing-xl: 48px;

// 圆角
$border-radius-sm: 4px;
$border-radius-base: 8px;
$border-radius-lg: 16px;
```

---

## 6. 构建配置

### 6.1 基础配置

```javascript
// config/index.js
const config = {
  projectName: 'my-app',
  date: '2026-4-5',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: `dist/${process.env.TARO_ENV}`,
  plugins: [],
  defineConstants: {},
  alias: {
    '@': path.resolve(__dirname, '..', 'src'),
  },

  copy: {
    patterns: [],
    options: {}
  },

  framework: 'react',
  compiler: {
    type: 'webpack5',
    prebundle: {
      enable: true,
      exclude: ['taro-ui']
    }
  },

  // 小程序配置
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {
          selectorBlackList: ['nut-', 'at-']
        }
      }
    }
  },

  // H5 配置
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    esnextModules: ['taro-ui'],
    postcss: {
      autoprefixer: {
        enable: true,
        config: {}
      }
    }
  },

  // RN 配置
  rn: {
    appName: 'taroDemo',
    postcss: {
      cssModules: {
        enable: false
      }
    }
  },

  // 鸿蒙配置
  harmony: {
    // 鸿蒙特有配置
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
```

### 6.2 环境配置

```javascript
// config/dev.js
module.exports = {
  logger: {
    quiet: false,
    stats: true
  },
  mini: {},
  h5: {}
}

// config/prod.js
module.exports = {
  mini: {
    // 小程序分包优化
    optimizeMainPackage: {
      enable: true
    }
  },
  h5: {
    // H5 资源压缩
    publicPath: './'
  }
}
```

---

## 7. 开发规范

### 7.1 文件命名
- 组件：PascalCase（如 `UserCard.tsx`）
- 页面：index.tsx + index.scss + index.config.ts
- Hooks：camelCase，以 use 开头（如 `useUser.ts`）
- 工具函数：camelCase

### 7.2 代码风格
- TypeScript：严格模式开启
- 组件：函数组件 + Hooks
- 样式：SCSS + CSS Modules（可选）

### 7.3 Git 提交规范
```
feat: 新功能
fix: 修复
docs: 文档
style: 格式
refactor: 重构
test: 测试
chore: 构建/工具
```

---

## 8. 开发命令

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev:weapp    # 微信小程序
pnpm dev:h5       # H5
pnpm dev:rn       # APP (RN)
pnpm dev:harmony  # 鸿蒙

# 生产构建
pnpm build:weapp
pnpm build:h5
pnpm build:rn
pnpm build:harmony
```

---

## 9. 注意事项

### 9.1 小程序
- 包体积限制 2MB（可分包）
- 避免使用 DOM 操作
- 图片资源使用 CDN

### 9.2 H5
- 浏览器兼容性（IOS Safari、Android Chrome）
- 响应式布局适配

### 9.3 APP
- 原生模块调用需适配
- 热更新配置

### 9.4 鸿蒙
- Taro 4.0.6+ 版本
- 部分 API 差异需条件编译处理

---

## 10. 后续扩展

- [ ] 单元测试（Jest + React Testing Library）
- [ ] E2E 测试（Miniprogram-automator）
- [ ] CI/CD 流水线
- [ ] 性能监控
- [ ] 错误上报

---

**设计确认日期**: 2026-04-05
**技术栈版本**: Taro 4.0 + React 18 + TypeScript 5.0 + Redux Toolkit 2.0
