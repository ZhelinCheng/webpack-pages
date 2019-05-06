/**
 * Created by ChengZheLin on 2019/5/6.
 * Features:
 */

'use strict'
const webpack = require('webpack')
const {resolve} = require('./bundle')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const webpackBaseFn = require('./webpack.base.conf')
const webpackMerge = require('webpack-merge')

function f () {
  const baseConfig = webpackBaseFn()

  return webpackMerge(baseConfig, {
    mode: 'production',
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              warnings: false,
              drop_debugger: false,
              drop_console: true
            }
          }
        }),
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            safe: true
          }
        })
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'css/[name].bundle.[hash:6].css'
      })
    ],
    stats: {
      chunkGroups: false,
      chunkModules: false,
      chunkOrigins: false,
      modules: false,
      moduleTrace: false,
      source: false,
      children: false
    }
  })
}

module.exports = f()
