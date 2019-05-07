/**
 * Created by ChengZheLin on 2019/5/6.
 * Features:
 */

'use strict'
process.env.NODE_ENV = 'development'

const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const {resolve} = require('./bundle')
const webpackBaseFn = require('./webpack.base.conf')

module.exports = new Promise((rsl) => {
  const baseConfig = webpackBaseFn()
  const mainConfig = webpackMerge(baseConfig, {
    mode: 'development',
    devServer: {
      contentBase: resolve('dist'),
      port: '8080',
      host: '0.0.0.0',
      // hot: true,
      // compress: true,
      noInfo: true,
      overlay: {
        errors: true
      }
    },
    plugins: [
      //热更新
      // new webpack.NamedModulesPlugin(),
      // new webpack.HotModuleReplacementPlugin()
    ]
  })

  rsl(mainConfig)
})
