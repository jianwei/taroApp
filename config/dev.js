// @author Claude Code (claude-sonnet-4-6)

module.exports = {
  logger: {
    quiet: false,
    stats: false
  },
  mini: {},
  h5: {
    router: {
      mode: 'browser'
    },
    devServer: {
      port: 10086,
      host: '0.0.0.0',
      hot: true,
      open: false,
      client: {
        overlay: {
          errors: true,
          warnings: false
        },
        logging: 'none'
      },
      devMiddleware: {
        stats: 'errors-only'
      },
      historyApiFallback: {
        rewrites: [
          { from: /./, to: '/index.html' }
        ]
      },
      static: {
        directory: 'dist/h5'
      }
    },
  }
}
