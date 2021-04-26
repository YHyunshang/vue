
const path = require('path');
//导入代码压缩插件
const TerserPlugin = require('terser-webpack-plugin');//替代uglifyjs-webpack-plugin

// gzip
const productionGzipExtensions = ['js', 'css'] // 需要gzip压缩的文件后缀

function resolve (dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    lintOnSave: true,
    chainWebpack: (config) => { // 项目中文件的引用alias
        config.resolve.alias
            .set('@$', resolve('src'))
            .set('@assets',resolve('src/assets'))
            .set('@components',resolve('src/components'))
    },
    configureWebpack: {
      plugins: [],
      optimization: {
       minimizer: [
         new TerserPlugin({
             //采用多进程打包
             parallel: 4,
             terserOptions: {
               compress: {
                 // 去除debug、console
                 warnings: true,
                 drop_debugger: true,
                 drop_console: true
               } }
           })
       ],
     }
    }
}
