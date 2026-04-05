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
