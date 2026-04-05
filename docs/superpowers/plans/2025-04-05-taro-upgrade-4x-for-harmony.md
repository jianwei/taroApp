# Taro 4.0 升级计划 - 支持鸿蒙原生应用

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 将项目从 Taro 3.6.38 升级到 Taro 4.0+，支持微信小程序、H5、React Native、鸿蒙原生应用四端编译

**Architecture:** Taro 4.0 引入新的编译架构，使用 `@tarojs/plugin-platform-harmony-ets` 插件支持鸿蒙原生应用开发

**Tech Stack:** Taro 4.0.x, React 18, TypeScript, Webpack5/Vite

---

## 前置条件

- [ ] 确认当前分支代码已提交
- [ ] 备份当前配置

---

## Task 1: 更新 package.json - Taro 4.0 依赖

**Files:**
- Modify: `package.json`

- [ ] **Step 1: 更新所有 Taro 包版本**

将所有 `@tarojs/*` 包从 `3.6.38` 升级到 `4.0.8` (或最新 4.0.x 版本):

```json
{
  "dependencies": {
    "@tarojs/components": "4.0.8",
    "@tarojs/components-rn": "4.0.8",
    "@tarojs/helper": "4.0.8",
    "@tarojs/plugin-framework-react": "4.0.8",
    "@tarojs/plugin-platform-h5": "4.0.8",
    "@tarojs/plugin-platform-weapp": "4.0.8",
    "@tarojs/react": "4.0.8",
    "@tarojs/rn-runner": "4.0.8",
    "@tarojs/rn-style-transformer": "4.0.8",
    "@tarojs/rn-supporter": "4.0.8",
    "@tarojs/runtime": "4.0.8",
    "@tarojs/runtime-rn": "4.0.8",
    "@tarojs/shared": "4.0.8",
    "@tarojs/taro": "4.0.8",
    "@tarojs/taro-rn": "4.0.8"
  },
  "devDependencies": {
    "@tarojs/cli": "4.0.8",
    "@tarojs/mini-runner": "4.0.8",
    "@tarojs/webpack5-runner": "4.0.8",
    "babel-preset-taro": "4.0.8",
    "eslint-config-taro": "4.0.8"
  }
}
```

- [ ] **Step 2: 添加鸿蒙平台插件**

在 `devDependencies` 中添加:
```json
"@tarojs/plugin-platform-harmony": "4.0.8",
"@tarojs/plugin-platform-harmony-ets": "4.0.8"
```

- [ ] **Step 3: 安装依赖**

Run: `pnpm install`
Expected: 依赖安装成功

---

## Task 2: 更新配置文件 - Taro 4.0 格式

**Files:**
- Modify: `config/index.js`

- [ ] **Step 1: 更新 compiler 配置**

将:
```javascript
compiler: 'webpack5',
```

改为:
```javascript
compiler: {
  type: 'webpack5',
  prebundle: {
    enable: false
  }
},
```

- [ ] **Step 2: 更新 h5 配置中的 router**

将 `h5.router` 移到外部同层级:
```javascript
h5: {
  publicPath: '/',
  staticDirectory: 'static',
  // ... 其他 h5 配置
},
// Taro 4.x router 配置在 h5 外部
router: {
  mode: 'browser',
  basename: '/'
},
```

- [ ] **Step 3: 更新 harmony 配置**

改为:
```javascript
harmony: {
  projectPath: 'harmony',
  hapName: 'entry',
  // Taro 4.0 新增配置
  compiler: 'webpack5'
}
```

- [ ] **Step 4: 添加鸿蒙 ETS 插件**

在 `plugins` 数组中添加:
```javascript
plugins: [
  '@tarojs/plugin-platform-harmony',
  '@tarojs/plugin-platform-harmony-ets'
]
```

---

## Task 3: 更新鸿蒙项目配置

**Files:**
- Modify: `harmony/entry/src/main/config.json`

- [ ] **Step 1: 检查鸿蒙配置文件**

确认 `harmony/entry/src/main/config.json` 存在且格式正确:
```json
{
  "app": {
    "bundleName": "com.example.tarodemo",
    "vendor": "example",
    "version": {
      "code": 1,
      "name": "1.0.0"
    }
  },
  "deviceConfig": {},
  "module": {
    "package": "com.example.tarodemo.entry",
    "name": ".entry",
    "mainAbility": ".MainAbility",
    "deviceType": ["phone"],
    "distro": {
      "deliveryWithInstall": true,
      "moduleName": "entry",
      "moduleType": "entry"
    }
  }
}
```

---

## Task 4: 清理和重新安装

**Files:**
- Remove: `node_modules/`, `pnpm-lock.yaml`

- [ ] **Step 1: 清理旧依赖**

Run: `rm -rf node_modules pnpm-lock.yaml`

- [ ] **Step 2: 重新安装依赖**

Run: `pnpm install`
Expected: 所有依赖安装成功，无版本冲突

---

## Task 5: 验证四端编译

- [ ] **Step 1: 测试微信小程序编译**

Run: `pnpm build:weapp`
Expected: 编译成功，无错误

- [ ] **Step 2: 测试 H5 编译**

Run: `pnpm build:h5`
Expected: 编译成功，无错误

- [ ] **Step 3: 测试 React Native 编译**

Run: `pnpm build:rn`
Expected: 编译成功，无错误（可能有警告）

- [ ] **Step 4: 测试鸿蒙编译**

Run: `pnpm build:harmony`
Expected: 编译成功，生成鸿蒙项目代码

---

## Task 6: 提交更改

**Files:**
- All modified files

- [ ] **Step 1: 提交代码**

```bash
git add -A
git commit -m "feat: upgrade to Taro 4.0.8 for HarmonyOS support

- Upgrade all @tarojs packages from 3.6.38 to 4.0.8
- Add @tarojs/plugin-platform-harmony-ets plugin
- Update config/index.js for Taro 4.x format
- Support 4 platforms: WeChat, H5, RN, HarmonyOS

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## 验证清单

| 平台 | 编译命令 | 预期结果 |
|------|----------|----------|
| 微信小程序 | `pnpm build:weapp` | ✅ |
| H5 | `pnpm build:h5` | ✅ |
| React Native | `pnpm build:rn` | ✅ |
| 鸿蒙 | `pnpm build:harmony` | ✅ |

---

## 已知问题与解决方案

### 1. stylelint-taro-rn 版本冲突

**问题:** Taro 4.0 可能需要 stylelint-taro-rn 4.x

**解决:** 更新 package.json:
```json
"stylelint-taro-rn": "4.0.8"
```

### 2. React Native 版本兼容

**问题:** Taro 4.0 可能需要 React Native 0.72+

**解决:** 如需 RN 支持，可能需要升级 react-native 到 0.72.x 或更高

### 3. 鸿蒙项目模板

**问题:** 鸿蒙编译需要完整的鸿蒙项目结构

**解决:** 如缺少模板，可从 Taro 官方示例复制或使用 DevEco Studio 创建
