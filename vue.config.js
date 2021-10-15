module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/static/sanmi' : '/',
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        ws: true,
        pathRewrite: { '^/api': '' },
      },
    },
  },
}
