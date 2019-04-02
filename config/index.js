'use strict'
const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
    // "/api": {
        //     target: "http://10.67.25.187:9999",
        //     secure: false,
        //     changeOrigin: true
        // },
      '/vender': {
        target: 'http://10.0.71.108:10000',
        secure: false,
        changeOrigin: true
      }
        // "/vender": {
        //   target: "http://10.0.71.253:10000",
        //   secure: false,
        //   changeOrigin: true
        // }
        // "/vender": {
        //   target: "http://glzx.yonghui.cn:9000",
        //   secure: false,
        //   changeOrigin: true
        // }
    },
    host: 'localhost',
    port: 8080,
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false,
    useEslint: true,
    showEslintErrorsInOverlay: false,
    devtool: 'eval-source-map',
    cacheBusting: true,
    cssSourceMap: false
  },

  build: {
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '',
    productionSourceMap: false,
    devtool: '#source-map',
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
