/**
 * Created by ChengZheLin on 2019/5/6.
 * Features:
 */

'use strict'
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const {initConfig, resolve} = require('./bundle')
const initLoader = require('./loaders')

const config = {
  devtool: 'cheap-module-source-map',
  // 加载器
  module: {
    rules: []
  },
  resolve: {
    extensions: ['.js', '.json', '.ts'],
    mainFields: ['jsnext:main', 'browser', 'main']
  },
  plugins: [
    new CleanWebpackPlugin({
      verbose: true,
      dry: false
    }),
    new CopyWebpackPlugin([{
      from: resolve('public'),
      to: resolve('dist'),
      ignore: ['*.html']
    }])
  ]
}

module.exports = function () {
  const {
    entry,
    output,
    alias,
    htmlPlugins
  } = initConfig()
  const loaders = initLoader()

  config.entry = entry
  config.output = output
  config.resolve.alias = alias
  config.module.rules.push(...loaders)
  config.plugins.push(...htmlPlugins)

  return config
}
