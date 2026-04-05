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
  plugins: [
    '@tarojs/plugin-platform-harmony-ets'
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
  // Taro 4.x compiler 配置格式
  compiler: {
    type: 'webpack5',
    prebundle: {
      enable: false
    }
  },
  sass: {
    // 使用 sass 1.77.x 避免 Dart Sass 3.0 弃用警告
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
    webpackChain(chain) {
      chain.performance.hints(false)
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
  // Taro 4.x router 配置
  router: {
    mode: 'browser',
    basename: '/'
  },
  rn: {
    appName: 'taroApp',
    postcss: {
      cssModules: {
        enable: false
      }
    },
    // 禁用 stylelint
    enableStylelint: false
  },
  // 鸿蒙配置 - Taro 4.0 要求使用 vite
  harmony: {
    projectPath: 'harmony',
    hapName: 'entry',
    compiler: 'vite'
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
