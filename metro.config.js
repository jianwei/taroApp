const path = require('path')
const { mergeConfig } = require('metro-config')
const { getMetroConfig } = require('@tarojs/rn-supporter')

module.exports = (async function () {
  const taroConfig = await getMetroConfig()
  return mergeConfig({
    // custom your metro config here
    // https://facebook.github.io/metro/docs/configuration
    resolver: {
      nodeModulesPaths: [
        path.resolve(__dirname, 'node_modules'),
      ],
      blockList: [
        /\.worktrees\/.*/,
        /harmony\/.*/,
      ]
    },
    watchFolders: [
      path.resolve(__dirname),
    ]
  }, taroConfig)
})()
