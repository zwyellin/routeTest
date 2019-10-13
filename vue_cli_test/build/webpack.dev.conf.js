'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// friendly-errors-webpack-plugin用于更友好地输出webpack的警告、错误等信息
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
 // 自动检索下一个可用端口
const portfinder = require('portfinder')

// ?
const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    // postcss-loader：你写的css会自动根据Can i use里的数据添加不同前缀了
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // 该选项控制是否以及如何生成源映射,值：String。代表不同的映射结果
  devtool: config.dev.devtool,

  // DevServer 提供虚拟服务器，让我们进行开发和调试
  /**
   *clientLogLevel: 'warning',
    historyApiFallback: true,如果为 true ，页面出错不会弹出 404 页面或者对象{rewrites,verbose,disableDotRule}
    hot: true,
    compress: true,如果为 true ，开启虚拟服务器时，为你的代码进行压缩。加快开发流程和优化的作用
    host: 'localhost', 写主机名的。默认 localhost
    port: 8080 端口号。默认 8080
    contentBase:你要提供哪里的内容给虚拟服务器用。这里最好填 绝对路径。默认情况下，它将使用您当前的工作目录来提供内容
    open:true,true则自动打开浏览器
    overlay:如果为 true ，在浏览器上全屏显示编译的errors或warnings。默认 false （关闭）
    quiet:true，则终端输出的只有初始启动信息。 webpack 的警告和错误是不输出到终端的
    publicPath :配置了 publicPath后， url = '主机名' + 'publicPath配置的' +'原来的url.path'
    proxy:设置代理
    watchOptions ：一组自定义的监听模式，用来监听文件是否被改动过
   */
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
