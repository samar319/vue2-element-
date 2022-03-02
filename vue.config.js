const path = require('path')

const isDev = process.env.NODE_ENV === 'development'

const isProd = process.env.NODE_ENV === 'production'
const port = 8080
/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
const config = {
  // 是否开启eslint校验
  lintOnSave: isDev,
  // 生产环境的sourceMap
  productionSourceMap: !isProd,
  assetsDir: 'static',
  // 路径配置
  configureWebpack: config => {
    config.resolve.alias = {
      '@': path.resolve(__dirname, './src'),
      _p: path.resolve(__dirname, './src/plugins'),
      _v: path.resolve(__dirname, './src/views'),
      _c: path.resolve(__dirname, './src/components'),
      _a: path.resolve(__dirname, './src/assets')
    }
  },
  chainWebpack: config => {
    // 设置系统的title名称
    config.plugin('html').tap(args => {
      args[0].title = '前端基础模板'
      return args
    })
  },
  devServer: {
    port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    }
  }
}

module.exports = config
