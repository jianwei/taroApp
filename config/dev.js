module.exports = {
  logger: {
    quiet: false,
    stats: true
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
        logging: 'error'
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
    htmlPlugin: {
      template: 'public/index.html',
      inject: 'body'
    }
  }
}
