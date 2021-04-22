/**
 * Created by ChengZheLin on 2019/5/6.
 * Features:
 */
'use strict'
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// const CleanWebpackPlugin = require('clean-webpack-plugin')
// const PurgecssPlugin = require('purgecss-webpack-plugin')
const webpackBaseFn = require('./webpack.base.conf')
const { merge } = require('webpack-merge')
// const glob = require('glob')
const {wpConfig} = require('./bundle')

function f () {
  const baseConfig = webpackBaseFn()

  return merge(baseConfig, {
    mode: 'production',
    plugins: [
      /* new CleanWebpackPlugin({
        verbose: false,
        dry: false
      }) */
    ]
  })
}

module.exports = f()
