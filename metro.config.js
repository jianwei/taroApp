const path = require('path')
const { mergeConfig } = require('metro-config')
const { getMetroConfig } = require('@tarojs/rn-supporter')

module.exports = (async function () {
  const taroConfig = await getMetroConfig()
  return mergeConfig({
    resolver: {
      nodeModulesPaths: [
        path.resolve(__dirname, 'node_modules'),
      ],
      blockList: [
        /\.worktrees\/.*/,
        /harmony\/.*/,
      ],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
      extraNodeModules: {
        // Mock expo modules to avoid native dependency issues
        'expo-av': path.resolve(__dirname, 'src/mocks/expo-av.js'),
        'expo-modules-core': path.resolve(__dirname, 'src/mocks/expo-modules-core.js'),
        'expo-file-system': path.resolve(__dirname, 'src/mocks/expo-file-system.js'),
        'expo-keep-awake': path.resolve(__dirname, 'src/mocks/expo-keep-awake.js'),
        'expo-video': path.resolve(__dirname, 'src/mocks/expo-video.js'),
        'expo-barcode-scanner': path.resolve(__dirname, 'src/mocks/expo-barcode-scanner.js'),
      },
    },
    watchFolders: [
      path.resolve(__dirname),
    ],
    cacheStores: [],
    resetCache: true,
  }, taroConfig)
})()
