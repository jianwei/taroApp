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
