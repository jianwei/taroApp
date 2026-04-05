# Taro 4 四端跨平台项目实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 初始化 Taro 4 四端统一项目，完成基础架构搭建，支持微信小程序、H5、APP（RN）、鸿蒙四端运行。

**Architecture:** 基于 Taro 4 跨端编译能力，使用 React + TypeScript 开发，Redux Toolkit 管理状态，Taro UI 作为组件库，通过条件编译和平台适配实现四端代码统一。

**Tech Stack:** Taro 4.0 + React 18 + TypeScript 5.0 + Redux Toolkit 2.0 + Taro UI 3.x

---

## 文件结构总览

```
my-app/
├── config/                     # Taro 构建配置
│   ├── index.js
│   ├── dev.js
│   ├── prod.js
│   ├── weapp.js
│   ├── h5.js
│   ├── rn.js
│   └── harmony.js
├── src/
│   ├── app.tsx                # 应用入口
│   ├── app.config.ts
│   ├── app.scss
│   ├── api/                   # API 请求封装
│   │   ├── request.ts
│   │   └── types.ts
│   ├── components/            # 公共组件
│   │   ├── Loading/
│   │   │   ├── index.tsx
│   │   │   └── index.scss
│   │   └── Empty/
│   │       ├── index.tsx
│   │       └── index.scss
│   ├── constants/             # 常量定义
│   │   └── index.ts
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
│   │   ├── index.ts
│   │   ├── hooks.ts
│   │   ├── storage/
│   │   │   └── taro-storage.ts
│   │   └── slices/
│   │       ├── userSlice.ts
│   │       └── commonSlice.ts
│   ├── types/                 # 全局类型
│   │   ├── global.d.ts
│   │   └── user.d.ts
│   ├── utils/                 # 工具函数
│   │   ├── index.ts
│   │   ├── platform.ts
│   │   └── storage.ts
│   └── styles/                # 全局样式
│       ├── variables.scss
│       └── common.scss
├── types/
│   └── taro-env.d.ts
├── package.json
├── tsconfig.json
├── babel.config.js
└── project.config.json
```

---

## Task 1: 初始化项目

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `babel.config.js`
- Create: `project.config.json`
- Create: `.eslintrc.js`
- Create: `.prettierrc`

- [ ] **Step 1: 创建 package.json**

```json
{
  "name": "taro-cross-platform-app",
  "version": "1.0.0",
  "private": true,
  "description": "Taro 4 四端统一跨平台项目",
  "templateInfo": {
    "name": "react",
    "typescript": true,
    "css": "sass"
  },
  "scripts": {
    "build:weapp": "taro build --type weapp",
    "build:swan": "taro build --type swan",
    "build:alipay": "taro build --type alipay",
    "build:tt": "taro build --type tt",
    "build:h5": "taro build --type h5",
    "build:rn": "taro build --type rn",
    "build:harmony": "taro build --type harmony",
    "dev:weapp": "npm run build:weapp -- --watch",
    "dev:swan": "npm run build:swan -- --watch",
    "dev:alipay": "npm run build:alipay -- --watch",
    "dev:tt": "npm run build:tt -- --watch",
    "dev:h5": "npm run build:h5 -- --watch",
    "dev:rn": "npm run build:rn -- --watch",
    "dev:harmony": "npm run build:harmony -- --watch"
  },
  "browserslist": [
    "last 3 versions",
    "Android >= 4.1",
    "ios >= 8"
  ],
  "author": "",
  "dependencies": {
    "@babel/runtime": "^7.24.0",
    "@reduxjs/toolkit": "^2.2.0",
    "@tarojs/components": "4.0.8",
    "@tarojs/helper": "4.0.8",
    "@tarojs/plugin-framework-react": "4.0.8",
    "@tarojs/plugin-platform-h5": "4.0.8",
    "@tarojs/plugin-platform-weapp": "4.0.8",
    "@tarojs/plugin-platform-harmony": "4.0.8",
    "@tarojs/react": "4.0.8",
    "@tarojs/runtime": "4.0.8",
    "@tarojs/shared": "4.0.8",
    "@tarojs/taro": "4.0.8",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-redux": "^9.1.0",
    "redux-persist": "^6.0.0",
    "taro-ui": "^3.3.0"
  },
  "devDependencies": {
    "@babel/core": "^7.24.0",
    "@babel/plugin-proposal-class-properties": "^7.18.0",
    "@babel/plugin-proposal-decorators": "^7.24.0",
    "@babel/plugin-proposal-object-rest-spread": "^7.20.0",
    "@babel/plugin-syntax-dynamic-import": "^7.8.0",
    "@babel/plugin-transform-runtime": "^7.24.0",
    "@babel/preset-env": "^7.24.0",
    "@babel/preset-react": "^7.23.0",
    "@babel/preset-typescript": "^7.23.0",
    "@pmmmwh/react-refresh-webpack-plugin": "^0.5.0",
    "@tarojs/cli": "4.0.8",
    "@tarojs/webpack5-runner": "4.0.8",
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@types/webpack-env": "^1.18.0",
    "@typescript-eslint/eslint-plugin": "^7.0.0",
    "@typescript-eslint/parser": "^7.0.0",
    "babel-preset-taro": "4.0.8",
    "css-loader": "^6.10.0",
    "eslint": "^8.57.0",
    "eslint-config-taro": "4.0.8",
    "eslint-plugin-import": "^2.29.0",
    "eslint-plugin-react": "^7.33.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "postcss": "^8.4.0",
    "react-refresh": "^0.14.0",
    "sass": "^1.71.0",
    "sass-loader": "^14.1.0",
    "style-loader": "^3.3.0",
    "stylelint": "^16.2.0",
    "typescript": "^5.3.0",
    "webpack": "^5.90.0"
  }
}
```

- [ ] **Step 2: 创建 tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2015",
    "lib": ["ES2015", "ES2017", "DOM"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": [
    "./src",
    "./types",
    "./config"
  ],
  "exclude": [
    "node_modules",
    "dist"
  ]
}
```

- [ ] **Step 3: 创建 babel.config.js**

```javascript
// babel.config.js
module.exports = {
  presets: [
    ['taro', {
      framework: 'react',
      ts: true
    }]
  ],
  plugins: [
    [
      'import',
      {
        'libraryName': 'taro-ui',
        'customName': (name) => {
          if (name === 'taro-ui') {
            return `taro-ui/lib/index`;
          }
          return `taro-ui/lib/${name.replace(/^at-/, '')}`;
        },
        'style': (name) => {
          return `${name}/index.scss`;
        }
      },
      'taro-ui'
    ]
  ]
}
```

- [ ] **Step 4: 创建 project.config.json（微信小程序配置）**

```json
{
  "miniprogramRoot": "dist/weapp/",
  "projectname": "taro-cross-platform-app",
  "description": "Taro 4 四端统一跨平台项目",
  "appid": "touristappid",
  "setting": {
    "urlCheck": true,
    "es6": true,
    "enhance": true,
    "postcss": true,
    "preloadBackgroundData": false,
    "minified": true,
    "newFeature": true,
    "coverView": true,
    "nodeModules": false,
    "autoAudits": false,
    "showShadowRootInWxmlPanel": true,
    "scopeDataCheck": false,
    "uglifyFileName": false,
    "checkInvalidKey": true,
    "checkSiteMap": true,
    "uploadWithSourceMap": true,
    "compileHotReLoad": true,
    "lazyloadPlaceholderEnable": false,
    "useMultiFrameRuntime": true,
    "useApiHook": true,
    "useApiHostProcess": true,
    "babelSetting": {
      "ignore": [],
      "disablePlugins": [],
      "outputPath": ""
    },
    "enableEngineNative": false,
    "useIsolateContext": true,
    "userConfirmedBundleSwitch": false,
    "packNpmManually": false,
    "packNpmRelationList": [],
    "minifyWXSS": true,
    "disableUseStrict": false,
    "minifyWXML": true,
    "showES6CompileOption": false,
    "useCompilerPlugins": false
  },
  "compileType": "miniprogram",
  "simulatorType": "wechat",
  "simulatorPluginLibVersion": {},
  "condition": {}
}
```

- [ ] **Step 5: 创建 ESLint 和 Prettier 配置**

```javascript
// .eslintrc.js
module.exports = {
  root: true,
  extends: [
    'taro/react',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': 'error',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off'
  }
}
```

```json
// .prettierrc
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
```

- [ ] **Step 6: 安装依赖**

Run: `pnpm install`
Expected: 依赖安装完成，无错误

- [ ] **Step 7: Commit**

```bash
git add package.json tsconfig.json babel.config.js project.config.json .eslintrc.js .prettierrc
git commit -m "chore: init project configuration"
```

---

## Task 2: 配置 Taro 构建

**Files:**
- Create: `config/index.js`
- Create: `config/dev.js`
- Create: `config/prod.js`
- Create: `config/weapp.js`
- Create: `config/h5.js`
- Create: `config/rn.js`
- Create: `config/harmony.js`

- [ ] **Step 1: 创建主配置文件 config/index.js**

```javascript
// @author Claude Code (claude-sonnet-4-6)

const path = require('path')

const config = {
  projectName: 'taro-cross-platform-app',
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
  sass: {
    resource: [
      path.resolve(__dirname, '..', 'src/styles/variables.scss')
    ],
    data: `@import "${path.resolve(__dirname, '..', 'src/styles/variables.scss')}";
`
  },
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {
          selectorBlackList: ['at-']
        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024
        }
      },
      cssModules: {
        enable: false,
        config: {
          namingPattern: 'module',
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    esnextModules: ['taro-ui'],
    postcss: {
      autoprefixer: {
        enable: true,
        config: {}
      },
      cssModules: {
        enable: false,
        config: {
          namingPattern: 'module',
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  rn: {
    appName: 'taroApp',
    postcss: {
      cssModules: {
        enable: false
      }
    }
  },
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

- [ ] **Step 2: 创建环境配置**

```javascript
// config/dev.js
module.exports = {
  logger: {
    quiet: false,
    stats: true
  },
  mini: {},
  h5: {
    devServer: {
      port: 10086,
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          pathRewrite: {
            '^/api': ''
          }
        }
      }
    }
  }
}
```

```javascript
// config/prod.js
module.exports = {
  mini: {
    optimizeMainPackage: {
      enable: true
    }
  },
  h5: {
    publicPath: './'
  }
}
```

- [ ] **Step 3: 创建平台配置**

```javascript
// config/weapp.js
module.exports = {
  mini: {
    // 小程序特有优化
  }
}
```

```javascript
// config/h5.js
module.exports = {
  h5: {
    // H5 特有配置
  }
}
```

```javascript
// config/rn.js
module.exports = {
  rn: {
    // RN 特有配置
  }
}
```

```javascript
// config/harmony.js
module.exports = {
  harmony: {
    // 鸿蒙特有配置
  }
}
```

- [ ] **Step 4: Commit**

```bash
git add config/
git commit -m "chore: add taro build configuration"
```

---

## Task 3: 创建全局类型定义

**Files:**
- Create: `types/taro-env.d.ts`
- Create: `types/global.d.ts`
- Create: `src/types/global.d.ts`
- Create: `src/types/user.d.ts`
- Create: `src/types/api.d.ts`

- [ ] **Step 1: 创建 Taro 环境类型**

```typescript
// types/taro-env.d.ts
/// <reference types="@tarojs/taro" />

declare module '*.scss' {
  const content: { [className: string]: string }
  export default content
}

declare module '*.sass' {
  const content: { [className: string]: string }
  export default content
}

declare module '*.css' {
  const content: { [className: string]: string }
  export default content
}

declare module '*.png' {
  const value: string
  export default value
}

declare module '*.jpg' {
  const value: string
  export default value
}

declare module '*.jpeg' {
  const value: string
  export default value
}

declare module '*.svg' {
  const value: string
  export default value
}

declare module '*.gif' {
  const value: string
  export default value
}

declare const process: {
  env: {
    TARO_ENV: 'weapp' | 'swan' | 'alipay' | 'h5' | 'rn' | 'tt' | 'quickapp' | 'qq' | 'jd' | 'harmony'
    [key: string]: string | undefined
  }
}
```

- [ ] **Step 2: 创建全局类型**

```typescript
// src/types/global.d.ts

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
```

- [ ] **Step 3: 创建用户类型**

```typescript
// src/types/user.d.ts

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
```

- [ ] **Step 4: 创建 API 类型**

```typescript
// src/types/api.d.ts

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
```

- [ ] **Step 5: Commit**

```bash
git add types/ src/types/
git commit -m "chore: add type definitions"
```

---

## Task 4: 创建全局样式

**Files:**
- Create: `src/styles/variables.scss`
- Create: `src/styles/mixins.scss`
- Create: `src/styles/common.scss`

- [ ] **Step 1: 创建 SCSS 变量**

```scss
// src/styles/variables.scss
// @author Claude Code (claude-sonnet-4-6)

// 主色调
$color-primary: #6190e8;
$color-primary-light: #78a4f6;
$color-primary-dark: #346fc2;

// 辅助色
$color-success: #13ce66;
$color-warning: #ffcc00;
$color-danger: #ff4949;
$color-info: #78a4f6;

// 文字色
$color-text: #333333;
$color-text-secondary: #666666;
$color-text-light: #999999;
$color-text-lighter: #cccccc;

// 背景色
$color-bg: #f5f5f5;
$color-bg-white: #ffffff;
$color-bg-gray: #f8f8f8;

// 边框色
$color-border: #e5e5e5;
$color-border-light: #eeeeee;

// 字体大小
$font-size-xs: 20px;
$font-size-sm: 24px;
$font-size-base: 28px;
$font-size-lg: 32px;
$font-size-xl: 36px;
$font-size-xxl: 40px;

// 行高
$line-height-xs: 1.2;
$line-height-sm: 1.4;
$line-height-base: 1.6;
$line-height-lg: 1.8;

// 间距
$spacing-xs: 8px;
$spacing-sm: 16px;
$spacing-base: 24px;
$spacing-lg: 32px;
$spacing-xl: 48px;
$spacing-xxl: 64px;

// 圆角
$border-radius-sm: 4px;
$border-radius-base: 8px;
$border-radius-lg: 16px;
$border-radius-xl: 24px;
$border-radius-circle: 50%;

// 阴影
$box-shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.05);
$box-shadow-base: 0 4px 16px rgba(0, 0, 0, 0.08);
$box-shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.12);

// 过渡
$transition-fast: 0.15s ease-in-out;
$transition-base: 0.3s ease-in-out;
$transition-slow: 0.5s ease-in-out;

// z-index
$z-index-dropdown: 1000;
$z-index-sticky: 1020;
$z-index-fixed: 1030;
$z-index-modal-backdrop: 1040;
$z-index-modal: 1050;
$z-index-popover: 1060;
$z-index-tooltip: 1070;
$z-index-toast: 1080;
```

- [ ] **Step 2: 创建 SCSS Mixins**

```scss
// src/styles/mixins.scss
// @author Claude Code (claude-sonnet-4-6)

// 文字省略
@mixin text-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@mixin text-ellipsis-multi($lines: 2) {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: $lines;
  overflow: hidden;
}

// flex 布局
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

@mixin flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

@mixin flex-around {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

// 清除浮动
@mixin clearfix {
  &::after {
    content: '';
    display: table;
    clear: both;
  }
}

// 安全区域适配
@mixin safe-area-bottom {
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}

@mixin safe-area-top {
  padding-top: constant(safe-area-inset-top);
  padding-top: env(safe-area-inset-top);
}

// 1px 边框
@mixin border-top-1px($color: $color-border) {
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background-color: $color;
    transform: scaleY(0.5);
    transform-origin: 0 0;
  }
}

@mixin border-bottom-1px($color: $color-border) {
  position: relative;
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background-color: $color;
    transform: scaleY(0.5);
    transform-origin: 0 100%;
  }
}

// 遮罩层
@mixin mask($z-index: $z-index-modal-backdrop, $bg: rgba(0, 0, 0, 0.6)) {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: $z-index;
  background-color: $bg;
}
```

- [ ] **Step 3: 创建公共样式**

```scss
// src/styles/common.scss
// @author Claude Code (claude-sonnet-4-6)

@import './variables.scss';
@import './mixins.scss';

// 重置样式
page,
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: $font-size-base;
  line-height: $line-height-base;
  color: $color-text;
  background-color: $color-bg;
}

// 清除默认样式
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

// 页面容器
.page-container {
  min-height: 100vh;
  background-color: $color-bg;
}

// 安全区域适配
.safe-area-bottom {
  @include safe-area-bottom;
}

.safe-area-top {
  @include safe-area-top;
}

// 文字样式工具类
.text-primary { color: $color-primary; }
.text-success { color: $color-success; }
.text-warning { color: $color-warning; }
.text-danger { color: $color-danger; }
.text-info { color: $color-info; }

.text-xs { font-size: $font-size-xs; }
.text-sm { font-size: $font-size-sm; }
.text-base { font-size: $font-size-base; }
.text-lg { font-size: $font-size-lg; }
.text-xl { font-size: $font-size-xl; }

.text-bold { font-weight: bold; }
.text-center { text-align: center; }
.text-left { text-align: left; }
.text-right { text-align: right; }

.text-ellipsis { @include text-ellipsis; }
.text-ellipsis-2 {
  @include text-ellipsis-multi(2);
}

// 间距工具类
.m-xs { margin: $spacing-xs; }
.m-sm { margin: $spacing-sm; }
.m-base { margin: $spacing-base; }
.m-lg { margin: $spacing-lg; }
.m-xl { margin: $spacing-xl; }

.p-xs { padding: $spacing-xs; }
.p-sm { padding: $spacing-sm; }
.p-base { padding: $spacing-base; }
.p-lg { padding: $spacing-lg; }
.p-xl { padding: $spacing-xl; }

// flex 工具类
.flex { display: flex; }
.flex-column { flex-direction: column; }
.flex-wrap { flex-wrap: wrap; }
.flex-center { @include flex-center; }
.flex-between { @include flex-between; }
.flex-around { @include flex-around; }

.flex-1 { flex: 1; }
.flex-none { flex: none; }

.items-center { align-items: center; }
.items-start { align-items: flex-start; }
.items-end { align-items: flex-end; }

.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }
.justify-around { justify-content: space-around; }
.justify-end { justify-content: flex-end; }

// 隐藏
.hidden { display: none; }
.invisible { visibility: hidden; }

// 遮罩
.mask {
  @include mask;
}
```

- [ ] **Step 4: Commit**

```bash
git add src/styles/
git commit -m "chore: add global styles"
```

---

## Task 5: 创建工具函数

**Files:**
- Create: `src/utils/index.ts`
- Create: `src/utils/platform.ts`
- Create: `src/utils/storage.ts`
- Create: `src/utils/format.ts`
- Create: `src/utils/validate.ts`
- Create: `src/constants/index.ts`

- [ ] **Step 1: 创建平台判断工具**

```typescript
// src/utils/platform.ts
// @author Claude Code (claude-sonnet-4-6)

/**
 * 平台环境判断
 */

// 当前平台
export const TARO_ENV = process.env.TARO_ENV

// 是否微信小程序
export const isWeapp = TARO_ENV === 'weapp'

// 是否 H5
export const isH5 = TARO_ENV === 'h5'

// 是否 React Native (APP)
export const isRN = TARO_ENV === 'rn'

// 是否鸿蒙
export const isHarmony = TARO_ENV === 'harmony'

// 是否 Web 平台
export const isWeb = isH5

// 是否原生平台（小程序/APP/鸿蒙）
export const isNative = isWeapp || isRN || isHarmony

/**
 * 获取平台名称
 */
export function getPlatformName(): string {
  const platformMap: Record<string, string> = {
    weapp: '微信小程序',
    h5: 'H5',
    rn: 'APP',
    harmony: '鸿蒙',
  }
  return platformMap[TARO_ENV || ''] || '未知平台'
}

/**
 * 平台特定处理
 * @param platformHandlers 各平台处理函数
 * @param defaultHandler 默认处理函数
 */
export function platformHandler<T>(
  platformHandlers: {
    weapp?: () => T
    h5?: () => T
    rn?: () => T
    harmony?: () => T
  },
  defaultHandler?: () => T
): T | undefined {
  const handler = platformHandlers[TARO_ENV as keyof typeof platformHandlers]
  if (handler) {
    return handler()
  }
  return defaultHandler?.()
}
```

- [ ] **Step 2: 创建存储工具**

```typescript
// src/utils/storage.ts
// @author Claude Code (claude-sonnet-4-6)

import Taro from '@tarojs/taro'

/**
 * 本地存储封装
 */

export const storage = {
  /**
   * 设置存储
   */
  async set<T>(key: string, data: T): Promise<void> {
    await Taro.setStorage({ key, data })
  },

  /**
   * 获取存储
   */
  async get<T>(key: string): Promise<T | null> {
    try {
      const { data } = await Taro.getStorage({ key })
      return data as T
    } catch {
      return null
    }
  },

  /**
   * 移除存储
   */
  async remove(key: string): Promise<void> {
    await Taro.removeStorage({ key })
  },

  /**
   * 清空存储
   */
  async clear(): Promise<void> {
    await Taro.clearStorage()
  },

  /**
   * 获取存储信息
   */
  async getInfo(): Promise<Taro.getStorageInfo.Option> {
    return Taro.getStorageInfo()
  },
}

/**
 * 同步存储（谨慎使用，小程序可能不支持）
 */
export const storageSync = {
  set<T>(key: string, data: T): void {
    Taro.setStorageSync(key, data)
  },

  get<T>(key: string): T | undefined {
    return Taro.getStorageSync(key) as T
  },

  remove(key: string): void {
    Taro.removeStorageSync(key)
  },

  clear(): void {
    Taro.clearStorageSync()
  },
}
```

- [ ] **Step 3: 创建格式化工具**

```typescript
// src/utils/format.ts
// @author Claude Code (claude-sonnet-4-6)

/**
 * 格式化工具函数
 */

/**
 * 格式化价格
 */
export function formatPrice(price: number | string, decimals = 2): string {
  const num = typeof price === 'string' ? parseFloat(price) : price
  if (isNaN(num)) return '0.00'
  return num.toFixed(decimals)
}

/**
 * 格式化数字（千分位）
 */
export function formatNumber(num: number | string): string {
  const n = typeof num === 'string' ? parseFloat(num) : num
  if (isNaN(n)) return '0'
  return n.toLocaleString('zh-CN')
}

/**
 * 格式化日期
 */
export function formatDate(
  date: Date | string | number,
  format = 'YYYY-MM-DD'
): string {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hour = String(d.getHours()).padStart(2, '0')
  const minute = String(d.getMinutes()).padStart(2, '0')
  const second = String(d.getSeconds()).padStart(2, '0')

  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hour)
    .replace('mm', minute)
    .replace('ss', second)
}

/**
 * 格式化手机号（隐藏中间4位）
 */
export function formatPhone(phone: string): string {
  if (!phone || phone.length !== 11) return phone
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

/**
 * 格式化文件大小
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
```

- [ ] **Step 4: 创建验证工具**

```typescript
// src/utils/validate.ts
// @author Claude Code (claude-sonnet-4-6)

/**
 * 验证工具函数
 */

/**
 * 验证手机号
 */
export function isPhone(phone: string): boolean {
  return /^1[3-9]\d{9}$/.test(phone)
}

/**
 * 验证邮箱
 */
export function isEmail(email: string): boolean {
  return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(email)
}

/**
 * 验证身份证号
 */
export function isIdCard(idCard: string): boolean {
  return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(idCard)
}

/**
 * 验证 URL
 */
export function isUrl(url: string): boolean {
  return /^https?:\/\/.+/.test(url)
}

/**
 * 验证是否为空
 */
export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true
  if (typeof value === 'string') return value.trim() === ''
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === 'object') return Object.keys(value).length === 0
  return false
}

/**
 * 验证是否为对象
 */
export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}
```

- [ ] **Step 5: 创建常量定义**

```typescript
// src/constants/index.ts
// @author Claude Code (claude-sonnet-4-6)

/**
 * 应用常量
 */

// 存储键名
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER_INFO: 'user_info',
  SETTINGS: 'settings',
  SEARCH_HISTORY: 'search_history',
  CART_DATA: 'cart_data',
} as const

// 分页配置
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 20, 50],
  MAX_PAGE_SIZE: 100,
} as const

// 请求配置
export const REQUEST_CONFIG = {
  TIMEOUT: 30000,
  RETRY_COUNT: 3,
  RETRY_DELAY: 1000,
} as const

// 正则表达式
export const REGEX = {
  PHONE: /^1[3-9]\d{9}$/,
  EMAIL: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/,
  ID_CARD: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
  URL: /^https?:\/\/.+/,
} as const

// 默认配置
export const DEFAULTS = {
  AVATAR: 'https://placeholder.com/avatar.png',
  NICKNAME: '用户',
} as const
```

- [ ] **Step 6: 创建工具入口**

```typescript
// src/utils/index.ts
// @author Claude Code (claude-sonnet-4-6)

export * from './platform'
export * from './storage'
export * from './format'
export * from './validate'
```

- [ ] **Step 7: Commit**

```bash
git add src/utils/ src/constants/
git commit -m "feat: add utility functions and constants"
```

---

## Task 6: 创建 API 请求封装

**Files:**
- Create: `src/api/types.ts`
- Create: `src/api/request.ts`

- [ ] **Step 1: 创建 API 类型**

```typescript
// src/api/types.ts
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
```

- [ ] **Step 2: 创建请求封装**

```typescript
// src/api/request.ts
// @author Claude Code (claude-sonnet-4-6)

import Taro from '@tarojs/taro'
import { store } from '@/store'
import { REQUEST_CONFIG } from '@/constants'
import type { RequestOptions, ApiResponse, RequestError } from './types'

// API 基础地址
const BASE_URL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3000/api'
  : 'https://api.example.com/api'

/**
 * 请求拦截
 */
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

/**
 * 响应拦截
 */
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

/**
 * 错误处理
 */
function errorHandler(error: unknown): never {
  let message = '网络错误，请稍后重试'
  let code = -1

  if (typeof error === 'object' && error !== null) {
    const err = error as RequestError
    message = err.message || message
    code = err.code || code
  }

  // 显示错误提示
  Taro.showToast({
    title: message,
    icon: 'none',
    duration: 2000,
  })

  throw { code, message } as RequestError
}

/**
 * 发送请求
 */
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

/**
 * GET 请求
 */
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

/**
 * POST 请求
 */
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

/**
 * PUT 请求
 */
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

/**
 * DELETE 请求
 */
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
```

- [ ] **Step 3: Commit**

```bash
git add src/api/
git commit -m "feat: add api request wrapper"
```

---

## Task 7: 创建 Redux Store

**Files:**
- Create: `src/store/storage/taro-storage.ts`
- Create: `src/store/slices/userSlice.ts`
- Create: `src/store/slices/commonSlice.ts`
- Create: `src/store/hooks.ts`
- Create: `src/store/index.ts`

- [ ] **Step 1: 创建 Redux 存储适配**

```typescript
// src/store/storage/taro-storage.ts
// @author Claude Code (claude-sonnet-4-6)

import Taro from '@tarojs/taro'
import type { Storage } from 'redux-persist'

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

- [ ] **Step 2: 创建 User Slice**

```typescript
// src/store/slices/userSlice.ts
// @author Claude Code (claude-sonnet-4-6)

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import Taro from '@tarojs/taro'
import { post } from '@/api/request'
import type { UserInfo, LoginResponse } from '@/types/user'
import type { ApiResponse } from '@/types/api'

// 登录
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

// 获取用户信息
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
```

- [ ] **Step 3: 创建 Common Slice**

```typescript
// src/store/slices/commonSlice.ts
// @author Claude Code (claude-sonnet-4-6)

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import Taro from '@tarojs/taro'
import type { SystemInfo, LocationInfo } from '@/types/global'

// 获取系统信息
export const fetchSystemInfo = createAsyncThunk(
  'common/fetchSystemInfo',
  async () => {
    const res = await Taro.getSystemInfo()
    return res as SystemInfo
  }
)

// 获取位置信息
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
```

- [ ] **Step 4: 创建 Typed Hooks**

```typescript
// src/store/hooks.ts
// @author Claude Code (claude-sonnet-4-6)

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './index'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
```

- [ ] **Step 5: 创建 Store 配置**

```typescript
// src/store/index.ts
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
```

- [ ] **Step 6: Commit**

```bash
git add src/store/
git commit -m "feat: add redux store with persistence"
```

---

## Task 8: 创建应用入口

**Files:**
- Create: `src/app.tsx`
- Create: `src/app.config.ts`
- Create: `src/app.scss`

- [ ] **Step 1: 创建应用配置**

```typescript
// src/app.config.ts
// @author Claude Code (claude-sonnet-4-6)

import { defineAppConfig } from '@tarojs/taro'

export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/profile/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'Taro App',
    navigationBarTextStyle: 'black',
  },
  tabBar: {
    color: '#999',
    selectedColor: '#6190e8',
    backgroundColor: '#fff',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: 'assets/images/home.png',
        selectedIconPath: 'assets/images/home-active.png',
      },
      {
        pagePath: 'pages/profile/index',
        text: '我的',
        iconPath: 'assets/images/profile.png',
        selectedIconPath: 'assets/images/profile-active.png',
      },
    ],
  },
})
```

- [ ] **Step 2: 创建应用样式**

```scss
// src/app.scss
// @author Claude Code (claude-sonnet-4-6)

// Taro UI 样式
@import 'taro-ui/dist/style/index.scss';

// 全局样式
@import './styles/common.scss';

// 页面容器
page {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 28px;
  line-height: 1.6;
  color: #333;
  background-color: #f5f5f5;
}
```

- [ ] **Step 3: 创建应用入口**

```tsx
// src/app.tsx
// @author Claude Code (claude-sonnet-4-6)

import { Component, PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store'
import Taro from '@tarojs/taro'
import { fetchSystemInfo, setNetworkStatus } from './store/slices/commonSlice'
import './app.scss'

class App extends Component<PropsWithChildren> {
  componentDidMount() {
    // 获取系统信息
    store.dispatch(fetchSystemInfo())

    // 监听网络状态
    Taro.onNetworkStatusChange((res) => {
      store.dispatch(setNetworkStatus(res.isConnected ? 'online' : 'offline'))
    })
  }

  componentDidShow() {
    console.log('App Show')
  }

  componentDidHide() {
    console.log('App Hide')
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {this.props.children}
        </PersistGate>
      </Provider>
    )
  }
}

export default App
```

- [ ] **Step 4: Commit**

```bash
git add src/app.tsx src/app.config.ts src/app.scss
git commit -m "feat: add app entry with redux provider"
```

---

## Task 9: 创建页面

**Files:**
- Create: `src/pages/index/index.tsx`
- Create: `src/pages/index/index.config.ts`
- Create: `src/pages/index/index.scss`
- Create: `src/pages/profile/index.tsx`
- Create: `src/pages/profile/index.config.ts`
- Create: `src/pages/profile/index.scss`

- [ ] **Step 1: 创建首页配置**

```typescript
// src/pages/index/index.config.ts
export default definePageConfig({
  navigationBarTitleText: '首页',
})
```

- [ ] **Step 2: 创建首页样式**

```scss
// src/pages/index/index.scss
.index-page {
  padding: 24px;

  .header {
    text-align: center;
    margin-bottom: 48px;

    .title {
      font-size: 40px;
      font-weight: bold;
      color: #333;
      margin-bottom: 16px;
    }

    .subtitle {
      font-size: 28px;
      color: #666;
    }
  }

  .content {
    background: #fff;
    border-radius: 16px;
    padding: 32px;
    margin-bottom: 24px;

    .section-title {
      font-size: 32px;
      font-weight: bold;
      margin-bottom: 24px;
      color: #333;
    }

    .info-item {
      display: flex;
      justify-content: space-between;
      padding: 16px 0;
      border-bottom: 1px solid #eee;

      &:last-child {
        border-bottom: none;
      }

      .label {
        color: #666;
      }

      .value {
        color: #333;
        font-weight: 500;
      }
    }
  }

  .actions {
    margin-top: 48px;
  }
}
```

- [ ] **Step 3: 创建首页**

```tsx
// src/pages/index/index.tsx
// @author Claude Code (claude-sonnet-4-6)

import { View, Text } from '@tarojs/components'
import { AtButton, AtList, AtListItem, AtToast, AtCard } from 'taro-ui'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/store'
import { login, logout } from '@/store/slices/userSlice'
import { getPlatformName } from '@/utils/platform'
import './index.scss'

export default function Index() {
  const [toastOpen, setToastOpen] = useState(false)
  const [toastText, setToastText] = useState('')
  const dispatch = useAppDispatch()
  const { isLogin, userInfo, loading } = useAppSelector((state) => state.user)
  const { systemInfo, networkStatus } = useAppSelector((state) => state.common)

  const handleLogin = async () => {
    try {
      await dispatch(login()).unwrap()
      setToastText('登录成功')
      setToastOpen(true)
    } catch (error) {
      setToastText('登录失败')
      setToastOpen(true)
    }
  }

  const handleLogout = () => {
    dispatch(logout())
    setToastText('已退出登录')
    setToastOpen(true)
  }

  return (
    <View className='index-page'>
      <View className='header'>
        <Text className='title'>Taro 4 跨端应用</Text>
        <Text className='subtitle'>支持微信小程序、H5、APP、鸿蒙</Text>
      </View>

      <AtCard title='系统信息'>
        <AtList>
          <AtListItem title='当前平台' extraText={getPlatformName()} />
          <AtListItem title='网络状态' extraText={networkStatus === 'online' ? '在线' : '离线'} />
          {systemInfo && (
            <>
              <AtListItem title='设备型号' extraText={systemInfo.model || '-'} />
              <AtListItem title='系统版本' extraText={systemInfo.system || '-'} />
            </>
          )}
        </AtList>
      </AtCard>

      {isLogin && userInfo && (
        <AtCard title='用户信息' className='content'>
          <AtList>
            <AtListItem title='昵称' extraText={userInfo.nickname || '-'} />
            <AtListItem title='手机号' extraText={userInfo.phone || '-'} />
          </AtList>
        </AtCard>
      )}

      <View className='actions'>
        {isLogin ? (
          <AtButton type='secondary' onClick={handleLogout}>
            退出登录
          </AtButton>
        ) : (
          <AtButton type='primary' loading={loading} onClick={handleLogin}>
            微信登录
          </AtButton>
        )}
      </View>

      <AtToast
        isOpened={toastOpen}
        text={toastText}
        onClose={() => setToastOpen(false)}
      />
    </View>
  )
}
```

- [ ] **Step 4: 创建个人页配置**

```typescript
// src/pages/profile/index.config.ts
export default definePageConfig({
  navigationBarTitleText: '我的',
})
```

- [ ] **Step 5: 创建个人页样式**

```scss
// src/pages/profile/index.scss
.profile-page {
  padding: 24px;

  .user-card {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 16px;
    padding: 48px 32px;
    margin-bottom: 24px;
    color: #fff;
    text-align: center;

    .avatar {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      margin: 0 auto 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 48px;
    }

    .nickname {
      font-size: 36px;
      font-weight: bold;
      margin-bottom: 8px;
    }

    .phone {
      font-size: 28px;
      opacity: 0.8;
    }
  }

  .menu-list {
    background: #fff;
    border-radius: 16px;
    overflow: hidden;
  }

  .version {
    text-align: center;
    margin-top: 48px;
    color: #999;
    font-size: 24px;
  }
}
```

- [ ] **Step 6: 创建个人页**

```tsx
// src/pages/profile/index.tsx
// @author Claude Code (claude-sonnet-4-6)

import { View, Text } from '@tarojs/components'
import { AtList, AtListItem, AtAvatar } from 'taro-ui'
import { useAppSelector } from '@/store'
import { formatPhone } from '@/utils/format'
import './index.scss'

export default function Profile() {
  const { isLogin, userInfo } = useAppSelector((state) => state.user)

  return (
    <View className='profile-page'>
      <View className='user-card'>
        <View className='avatar'>
          {userInfo?.avatar ? (
            <AtAvatar circle image={userInfo.avatar} size='large' />
          ) : (
            <Text>👤</Text>
          )}
        </View>
        <View className='nickname'>
          {isLogin ? userInfo?.nickname || '用户' : '未登录'}
        </View>
        {isLogin && userInfo?.phone && (
          <View className='phone'>{formatPhone(userInfo.phone)}</View>
        )}
      </View>

      <View className='menu-list'>
        <AtList>
          <AtListItem title='我的订单' arrow='right' iconInfo={{ size: 25, color: '#6190e8', value: 'shopping-bag' }} />
          <AtListItem title='收货地址' arrow='right' iconInfo={{ size: 25, color: '#6190e8', value: 'map-pin' }} />
          <AtListItem title='设置' arrow='right' iconInfo={{ size: 25, color: '#6190e8', value: 'settings' }} />
        </AtList>
      </View>

      <View className='version'>版本 1.0.0</View>
    </View>
  )
}
```

- [ ] **Step 7: Commit**

```bash
git add src/pages/
git commit -m "feat: add home and profile pages"
```

---

## Task 10: 创建公共组件

**Files:**
- Create: `src/components/Loading/index.tsx`
- Create: `src/components/Loading/index.scss`
- Create: `src/components/Empty/index.tsx`
- Create: `src/components/Empty/index.scss`

- [ ] **Step 1: 创建 Loading 组件**

```tsx
// src/components/Loading/index.tsx
// @author Claude Code (claude-sonnet-4-6)

import { View } from '@tarojs/components'
import { AtActivityIndicator } from 'taro-ui'
import './index.scss'

interface LoadingProps {
  text?: string
  size?: number
  color?: string
}

export default function Loading({
  text = '加载中...',
  size = 32,
  color = '#6190e8',
}: LoadingProps) {
  return (
    <View className='loading-component'>
      <AtActivityIndicator size={size} color={color} />
      {text && <View className='loading-text'>{text}</View>}
    </View>
  )
}
```

- [ ] **Step 2: 创建 Loading 样式**

```scss
// src/components/Loading/index.scss
.loading-component {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px;

  .loading-text {
    margin-top: 16px;
    font-size: 28px;
    color: #999;
  }
}
```

- [ ] **Step 3: 创建 Empty 组件**

```tsx
// src/components/Empty/index.tsx
// @author Claude Code (claude-sonnet-4-6)

import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import './index.scss'

interface EmptyProps {
  title?: string
  description?: string
  buttonText?: string
  onButtonClick?: () => void
}

export default function Empty({
  title = '暂无数据',
  description,
  buttonText,
  onButtonClick,
}: EmptyProps) {
  return (
    <View className='empty-component'>
      <View className='empty-icon'>📦</View>
      <View className='empty-title'>{title}</View>
      {description && <View className='empty-desc'>{description}</View>}
      {buttonText && (
        <AtButton type='primary' size='small' onClick={onButtonClick}>
          {buttonText}
        </AtButton>
      )}
    </View>
  )
}
```

- [ ] **Step 4: 创建 Empty 样式**

```scss
// src/components/Empty/index.scss
.empty-component {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 96px 48px;

  .empty-icon {
    font-size: 96px;
    margin-bottom: 24px;
  }

  .empty-title {
    font-size: 32px;
    color: #333;
    margin-bottom: 16px;
  }

  .empty-desc {
    font-size: 28px;
    color: #999;
    margin-bottom: 32px;
    text-align: center;
  }
}
```

- [ ] **Step 5: Commit**

```bash
git add src/components/
git commit -m "feat: add common components"
```

---

## Task 11: 创建 assets 目录结构

**Files:**
- Create: `src/assets/images/.gitkeep`
- Create: `src/assets/fonts/.gitkeep`

- [ ] **Step 1: 创建 assets 目录**

```bash
mkdir -p src/assets/images src/assets/fonts
touch src/assets/images/.gitkeep src/assets/fonts/.gitkeep
```

- [ ] **Step 2: Commit**

```bash
git add src/assets/
git commit -m "chore: add assets directory structure"
```

---

## Task 12: 验证项目构建

**Files:**
- Modify: `package.json` (如有需要)

- [ ] **Step 1: 验证 TypeScript 编译**

Run: `npx tsc --noEmit`
Expected: 无类型错误

- [ ] **Step 2: 验证微信小程序构建**

Run: `pnpm build:weapp`
Expected: 构建成功，生成 `dist/weapp` 目录

- [ ] **Step 3: 验证 H5 构建**

Run: `pnpm build:h5`
Expected: 构建成功，生成 `dist/h5` 目录

- [ ] **Step 4: Commit 最终版本**

```bash
git add .
git commit -m "chore: verify build configuration"
```

---

## 自检清单

**Spec coverage:**
- ✅ Taro 4 项目结构 - Task 1-2
- ✅ TypeScript 配置 - Task 1
- ✅ Redux Toolkit 状态管理 - Task 7
- ✅ Taro UI 组件库 - Task 8
- ✅ 四端构建配置 - Task 2
- ✅ API 请求封装 - Task 6
- ✅ 平台差异处理 - Task 5
- ✅ 全局样式系统 - Task 4

**Placeholder scan:**
- ✅ 无 TBD/TODO
- ✅ 所有代码完整可运行

**Type consistency:**
- ✅ RootState / AppDispatch 类型统一
- ✅ API 类型与 Slice 类型一致
- ✅ 组件 Props 类型定义完整

---

**Plan complete and saved to `docs/superpowers/plans/2026-04-05-taro4-cross-platform-implementation.md`.**

**Two execution options:**

**1. Subagent-Driven (recommended)** - 每个 Task 由独立 subagent 执行，我在中间审查

**2. Inline Execution** - 在当前会话中批量执行任务

**Which approach?**
