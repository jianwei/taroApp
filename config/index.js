// @author Claude Code (claude-sonnet-4-6)

const path = require('path')

const config = {
  webpackChain(chain, webpack) {
    // H5 模式 webpack 配置由 @tarojs/plugin-platform-h5 插件处理
  },
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
  plugins: [
    ['@tarojs/plugin-platform-h5', {
      // H5 模式配置
      router: {
        mode: 'browser',
        basename: '/'
      }
    }]
  ],
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
    // 使用 sass 1.77.x 避免 Dart Sass 3.0 弃用警告
    // 如需升级 sass，需等待 taro-ui 更新以支持新版 sass 语法
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
    htmlPluginOption: {
      template: path.resolve(__dirname, '..', 'src/index.html')
    },
    output: {
      filename: 'js/[name].[contenthash:8].js',
      chunkFilename: 'js/[name].[contenthash:8].js'
    },
    miniCssExtractPluginOption: {
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css'
    },
    // 禁用资源大小警告
    webpackChain(chain) {
      chain.performance.hints(false)
      // 完全忽略所有警告
      chain.set('ignoreWarnings', [
        { message: /webpackExports/ },
        { message: /UnsupportedFeatureWarning/ },
        /webpackExports/,
        /UnsupportedFeatureWarning/
      ])
    },
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
