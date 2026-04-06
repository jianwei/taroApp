# @author Claude Code (kimi-k2.5)

# iOS 启动指南

本文档介绍如何在 iOS 模拟器上启动 Taro React Native 应用。

## 环境要求

- macOS 系统
- Xcode 14.0+（需先安装）
- Node.js 18+
- pnpm

## 安装依赖

```bash
pnpm install
```

## 启动 Metro 开发服务器

```bash
npx react-native start --reset-cache
```

> `--reset-cache` 参数用于清除 Metro 缓存，首次启动或遇到问题时建议使用。

## 启动 iOS 模拟器

### 方式一：使用 React Native CLI（推荐）

```bash
npx react-native run-ios
```

### 方式二：使用 xcodebuild

1. 进入 iOS 项目目录：

```bash
cd ios/ios
```

2. 安装 CocoaPods 依赖（首次需要）：

```bash
pod install
```

3. 编译并运行：

```bash
xcodebuild -workspace taroRN.xcworkspace -scheme taroRN -sdk iphonesimulator -destination 'platform=iOS Simulator,name=iPhone 15' build
```

4. 在模拟器中启动应用：

```bash
xcrun simctl launch booted org.reactjs.native.example.taroRN
```

### 方式三：使用 Xcode GUI

1. 打开 Xcode 工作区：

```bash
open ios/taroRN.xcworkspace
```

2. 选择目标模拟器（如 iPhone 15 Pro）
3. 点击运行按钮（Cmd+R）

## 常见问题

### 1. Metro 缓存问题

如果遇到奇怪的错误，尝试清除缓存：

```bash
rm -rf /tmp/metro-*
npx react-native start --reset-cache
```

### 2. 模拟器无法启动

检查可用的模拟器：

```bash
xcrun simctl list devices
```

启动特定模拟器：

```bash
xcrun simctl boot "iPhone 15 Pro"
```

### 3. 编译失败

尝试清理构建产物：

```bash
cd ios/ios
rm -rf build
xcodebuild clean -workspace taroRN.xcworkspace -scheme taroRN
```

### 4. CocoaPods 依赖问题

```bash
cd ios/ios
pod deintegrate
pod install
```

## 调试

### 查看日志

```bash
# 查看 Metro 日志
tail -f /tmp/metro.log

# 查看模拟器日志
xcrun simctl spawn booted log stream --level debug --predicate 'processImagePath CONTAINS "taroRN"'
```

### 截图

```bash
xcrun simctl io booted screenshot /tmp/simulator_screen.png
```

### 重新加载 JS（热重载）

在模拟器中按 `Cmd+R` 重新加载应用。

## 项目结构

```
ios/
├── taroRN.xcworkspace          # Xcode 工作区（使用 CocoaPods）
└── ios/                         # 实际项目目录
    ├── taroRN.xcodeproj         # Xcode 项目文件
    ├── taroRN.xcworkspace       # 工作区配置
    ├── Podfile                  # CocoaPods 依赖定义
    ├── Podfile.lock             # 锁定依赖版本
    ├── taroRN/                  # 应用源代码
    │   ├── AppDelegate.swift    # 应用代理
    │   ├── Info.plist           # 应用配置
    │   ├── LaunchScreen.storyboard  # 启动屏
    │   └── Images.xcassets/     # 图片资源
    └── build/                   # 编译输出（.gitignore 忽略）
```

## 参考

- [React Native 官方文档](https://reactnative.dev/docs/running-on-simulator-ios)
- [Taro React Native 指南](https://docs.taro.zone/docs/react-native)
